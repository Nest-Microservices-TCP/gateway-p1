import { Module } from '@nestjs/common';

import { CollaboratorsMSModule } from './collaborators-ms/collaborators-ms.module';
import { RoomsMSModule } from './rooms-ms/rooms-ms.module';
import { TransactionsMSModule } from './transactions-ms/transactions-ms.module';

@Module({
  imports: [RoomsMSModule, CollaboratorsMSModule, TransactionsMSModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
