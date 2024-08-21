import { Module } from '@nestjs/common';
import { RoomsMSModule } from './rooms-ms/rooms-ms.module';

@Module({
  imports: [RoomsMSModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
