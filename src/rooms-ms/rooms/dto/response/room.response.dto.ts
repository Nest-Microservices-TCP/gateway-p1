import { Expose } from 'class-transformer';
import { BaseResponseDto } from 'src/common/dto';

export class RoomResponseDto extends BaseResponseDto {
  @Expose()
  name: string;
}
