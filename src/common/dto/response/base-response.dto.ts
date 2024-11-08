import { Expose } from 'class-transformer';
import { Status } from '../../enums';

export abstract class BaseResponseDto {
  @Expose()
  id: string;
  createdAt: Date;
  updatedAt: Date;
  cratedBy: string;
  updatedBy: string;
  deletedAt: Date;
  status: Status;
}
