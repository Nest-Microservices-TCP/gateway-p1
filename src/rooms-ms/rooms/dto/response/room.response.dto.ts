import { BaseResponseDto } from 'src/common/dto/response';
import { Expose } from 'class-transformer';

export class RoomResponseDto extends BaseResponseDto {
  @Expose()
  name: string;
}
