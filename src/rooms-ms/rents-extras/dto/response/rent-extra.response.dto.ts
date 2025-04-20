import { Money } from 'src/grpc/common/common_types.pb';
import { RentExtra } from 'src/grpc/rooms/rents_extras.pb';

export class RentExtraResponseDto implements RentExtra {
  rent_extra_id: string;
  quantity: number;
  total: Money;
}
