import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { StoreRequestDto } from './dto/Storerequest.dto';
import { GetAllRequestDto } from './dto/GetAllRequest.dto';
import { Prisma, RequestStatus, Role } from '@prisma/client';
import { UpdateRequestStatusDto } from './dto/UpdateRequestStatus.dto';
import { EmailerService } from 'src/emailer/emailer.service';
import { CryptSecuirtyService } from 'src/security/Crypt-security.service';



@Injectable()
export class StoreService {
  constructor(private readonly database: DatabaseService, private readonly Emailer: EmailerService, private readonly cryptSecurityService: CryptSecuirtyService) { }
  async StoreRequest(StoreRequestDto: StoreRequestDto) {
    try {
      const { email } = StoreRequestDto;

      // Check if a store request already exists with this email
      const existingRequest = await this.database.storeRequest.findUnique({
        where: { email },
      });

      if (existingRequest) {
        throw new ConflictException('A store request with this email has already been submitted');
      }

      // Check if a user with this email is already registered
      const existingUser = await this.database.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new BadRequestException(
          'A user account with this email already exists.',
        );
      }

      //  Create the store request record
      const newRequest = await this.database.storeRequest.create({
        data: StoreRequestDto,
      });

      return { message: 'Store request submitted successfully' };
    } catch (error) {

      if (error instanceof ConflictException || error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('An error occurred while submitting the store request');
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
        'An error occurred while getting all requests',
      );
    }
  }
  async approveRequest(id: number, UpdateRequestStatusDto: UpdateRequestStatusDto) {
    try {
      const { status } = UpdateRequestStatusDto;

      const request = await this.database.storeRequest.findUnique({
        where: { id },
      });

      if (!request) {
        throw new NotFoundException(`Store request #${id} not found.`);
      }

      if (request.status !== RequestStatus.PENDING) {
        throw new BadRequestException(`Request has already been processed as ${request.status}.`);
      }

      if (status === RequestStatus.APPROVED) {

        const tempPassword = `Tafseel@${Math.floor(1000 + Math.random() * 9000)}`;
        const hashedPassword = await this.cryptSecurityService.hash(tempPassword, 10);


        await this.database.$transaction(async (tx) => {

          await tx.user.create({
            data: {
              name: request.ownerName,
              email: request.email,
              phone: request.phone,
              password: hashedPassword,
              role: Role.STORE_OWNER,
              isActive: true,
            },
          });

          await tx.storeRequest.update({
            where: { id },
            data: { status: RequestStatus.APPROVED },
          });
        });


        await this.Emailer.SendEmailOfStoreRequest(
          'Store Request Approved - Tafseel Platform',
          request.email,
          'ApproveStoreRequest',
          tempPassword,
        );

        return { message: 'Store request approved, account created, and email sent successfully.' };
      }


      if (status === RequestStatus.REJECTED) {

        await this.database.storeRequest.update({
          where: { id },
          data: { status: RequestStatus.REJECTED },
        });


        await this.Emailer.SendEmailOfStoreRequest(
          'Store Request Update - Tafseel Platform',
          request.email,
          'RejectStoreRequest',
        );

        return {
          message: 'Store request rejected and notification email sent.',
        };
      }
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('An error occurred while processing the store request status');
    }

  }
}
