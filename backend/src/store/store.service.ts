import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { StoreRequestDto } from './dto/Storerequest.dto';
import { GetAllRequestDto } from './dto/GetAllRequest.dto';
import { Prisma, RequestStatus, Role } from '@prisma/client';
import { UpdateRequestStatusDto } from './dto/UpdateRequestStatus.dto';
import { EmailerService } from 'src/emailer/emailer.service';
import { CryptSecuirtyService } from 'src/security/Crypt-security.service';

@Injectable()
export class StoreService {
  constructor(
    private readonly database: DatabaseService,
    private readonly Emailer: EmailerService,
    private readonly cryptSecurityService: CryptSecuirtyService,
  ) {}

  async StoreRequest(StoreRequestDto: StoreRequestDto) {
    try {
      const { email } = StoreRequestDto;

      const existingRequest = await this.database.storeRequest.findUnique({
        where: { email },
      });

      if (existingRequest) {
        throw new ConflictException(
          'تم إرسال طلب متجر بهذا البريد الإلكتروني مسبقًا',
        );
      }

      const existingUser = await this.database.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new BadRequestException(
          'يوجد حساب مستخدم مسجل بهذا البريد الإلكتروني مسبقًا',
        );
      }

      await this.database.storeRequest.create({
        data: StoreRequestDto,
      });

      return { message: 'تم إرسال طلب إنشاء المتجر بنجاح' };
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'حدث خطأ أثناء إرسال طلب المتجر',
      );
    }
  }

  async getAllRequest(query: GetAllRequestDto) {
    try {
      const { page = 1, limit = 10, search, status } = query;
      const skip = (page - 1) * limit;

      const where: Prisma.StoreRequestWhereInput = {};

      if (status) {
        where.status = status;
      }

      if (search && search.trim() !== '') {
        const cleanSearch = search.trim();

        where.OR = [
          { storeName: { contains: cleanSearch, mode: 'insensitive' } },
          { ownerName: { contains: cleanSearch, mode: 'insensitive' } },
          { email: { contains: cleanSearch, mode: 'insensitive' } },
          { phone: { contains: cleanSearch, mode: 'insensitive' } },
          { city: { contains: cleanSearch, mode: 'insensitive' } },
        ];
      }

      const [requests, totalCount] = await Promise.all([
        this.database.storeRequest.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        this.database.storeRequest.count({ where }),
      ]);

      const totalPages = Math.ceil(totalCount / limit);

      return {
        data: requests,
        totalCount,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'حدث خطأ أثناء جلب جميع الطلبات',
      );
    }
  }

  async approveRequest(
    id: number,
    updateRequestStatusDto: UpdateRequestStatusDto,
  ) {
    const logger = new Logger('ApproveRequest');

    try {
      const { status } = updateRequestStatusDto;

      const request = await this.database.storeRequest.findUnique({
        where: { id },
      });

      if (!request) {
        throw new NotFoundException(
          `طلب المتجر رقم ${id} غير موجود`,
        );
      }

      if (request.status !== RequestStatus.PENDING) {
        throw new BadRequestException(
          `تمت معالجة الطلب مسبقًا بالحالة ${request.status}`,
        );
      }

      if (status === RequestStatus.APPROVED) {
        const existingUser = await this.database.user.findFirst({
          where: {
            OR: [{ email: request.email }, { phone: request.phone }],
          },
        });

        if (existingUser) {
          const field =
            existingUser.email === request.email
              ? 'البريد الإلكتروني'
              : 'رقم الهاتف';

          throw new ConflictException(
            `${field} مرتبط بحساب آخر مسبقًا`,
          );
        }

        const tempPassword = `Tafseel@${Math.floor(
          1000 + Math.random() * 9000,
        )}`;

        const hashedPassword =
          await this.cryptSecurityService.hash(tempPassword, 10);

        await this.database.$transaction(async (tx) => {
          const newUser = await tx.user.create({
            data: {
              name: request.ownerName,
              email: request.email,
              phone: request.phone,
              password: hashedPassword,
              role: Role.STORE_OWNER,
              isActive: true,
            },
          });

          await tx.store.create({
            data: {
              storeName: request.storeName,
              city: request.city,
              ownerId: newUser.id,
            },
          });

          await tx.storeRequest.update({
            where: { id },
            data: { status: RequestStatus.APPROVED },
          });
        });

        let emailSent = true;

        try {
          await this.Emailer.SendEmailOfStoreRequest(
            'Store Request Approved - Tafseel Platform',
            request.email,
            'ApproveStoreRequest',
            tempPassword,
          );
        } catch (mailError) {
          emailSent = false;
          logger.error(
            `Failed to send approval email to ${request.email}:`,
            mailError,
          );
        }

        return {
          message: emailSent
            ? 'تم قبول طلب المتجر وإنشاء الحساب والمتجر وإرسال البريد الإلكتروني بنجاح'
            : 'تم قبول طلب المتجر وإنشاء الحساب والمتجر ولكن فشل إرسال البريد الإلكتروني',
        };
      }

      if (status === RequestStatus.REJECTED) {
        await this.database.storeRequest.update({
          where: { id },
          data: { status: RequestStatus.REJECTED },
        });

        let emailSent = true;

        try {
          await this.Emailer.SendEmailOfStoreRequest(
            'Store Request Update - Tafseel Platform',
            request.email,
            'RejectStoreRequest',
          );
        } catch (mailError) {
          emailSent = false;

          logger.error(
            `Failed to send rejection email to ${request.email}:`,
            mailError,
          );
        }

        return {
          message: emailSent
            ? 'تم رفض طلب المتجر وإرسال إشعار البريد الإلكتروني بنجاح'
            : 'تم رفض طلب المتجر ولكن فشل إرسال إشعار البريد الإلكتروني',
        };
      }
    } catch (error: any) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'يوجد مستخدم بهذا البريد الإلكتروني أو رقم الهاتف مسبقًا',
        );
      }

      logger.error('Error processing store request:', error);

      throw new InternalServerErrorException(
        error.message || 'حدث خطأ أثناء معالجة الطلب',
      );
    }
  }
}