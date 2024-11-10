import { BaseResponseDto } from 'src/common/dto/response';
import { Expose } from 'class-transformer';

export class RoomStateResponseDto extends BaseResponseDto {
  @Expose()
  name: string;

  @Expose()
  description: string;
}
