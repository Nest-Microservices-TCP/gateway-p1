import { Module } from '@nestjs/common';

import { CollaboratorsMSModule } from './collaborators-ms/collaborators-ms.module';
import { RoomsMSModule } from './rooms-ms/rooms-ms.module';

@Module({
  imports: [RoomsMSModule, CollaboratorsMSModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
