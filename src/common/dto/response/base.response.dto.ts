import { Expose } from 'class-transformer';
import { Status } from '../../enums';

export abstract class BaseResponseDto {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  cratedBy: string;

  @Expose()
  updatedBy: string;

  @Expose()
  deletedAt: Date;

  @Expose()
  status: Status;
}
