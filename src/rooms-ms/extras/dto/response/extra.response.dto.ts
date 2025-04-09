import { Expose } from 'class-transformer';
import { BaseResponseDto } from 'src/common/dto/response';

export class ExtraResponseDto extends BaseResponseDto {
  @Expose()
  extraId: string;

  @Expose()
  name: string;
}
