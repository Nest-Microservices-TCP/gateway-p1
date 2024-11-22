import { CollaboratorsMSModule } from './collaborators-ms/collaborators-ms.module';
import { RoomsMSModule } from './rooms-ms/rooms-ms.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [RoomsMSModule, CollaboratorsMSModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
