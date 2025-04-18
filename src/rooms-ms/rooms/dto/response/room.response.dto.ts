import { Expose } from 'class-transformer';
import { BaseResponseDto } from 'src/common/dto/response';

export class RoomResponseDto extends BaseResponseDto {
  @Expose()
  name: string;
}
