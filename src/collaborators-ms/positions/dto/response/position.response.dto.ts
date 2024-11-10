import { BaseResponseDto } from 'src/common/dto/response/base.response.dto';
import { Expose } from 'class-transformer';

export class PositionResponseDto extends BaseResponseDto {
  @Expose()
  name: string;

  @Expose()
  description: string;
}
