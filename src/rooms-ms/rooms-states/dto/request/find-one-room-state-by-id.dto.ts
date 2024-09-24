import { IsUUID } from 'class-validator';

export class FindOneRoomStateByIdDto {
  @IsUUID()
  roomStateId: string;
}
