import { BaseResponseDto } from 'src/common/dto';
import { Expose } from 'class-transformer';

export class AreaResponseDto extends BaseResponseDto {
  @Expose()
  name: string;
}
