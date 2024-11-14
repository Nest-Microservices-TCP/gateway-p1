import { BaseResponseDto } from 'src/common/dto/response';
import { Expose } from 'class-transformer';

export class ExtraResponseDto extends BaseResponseDto {
  @Expose()
  extraId: string;

  @Expose()
  name: string;
}
