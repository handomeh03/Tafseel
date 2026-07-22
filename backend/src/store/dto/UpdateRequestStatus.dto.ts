import { IsEnum, IsNotEmpty } from 'class-validator';
import { RequestStatus } from '@prisma/client';

export class UpdateRequestStatusDto {
  @IsEnum(RequestStatus, {
    message: 'Status must be a valid RequestStatus (PENDING, APPROVED, REJECTED)',
  })
  @IsNotEmpty({ message: 'Status is required' })
  status!: RequestStatus;
}