import { Module } from '@nestjs/common';
import { RoomsMSModule } from './rooms-ms/rooms-ms.module';
import { CollaboratorsMSModule } from './collaborators-ms/collaborators-ms.module';

@Module({
  imports: [RoomsMSModule, CollaboratorsMSModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
