import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { COLLABORATORS_MS, envs } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: COLLABORATORS_MS,
        transport: Transport.TCP,
        options: {
          host: envs.collaboratorsHost,
          port: envs.collaboratorsPort,
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: COLLABORATORS_MS,
        transport: Transport.TCP,
        options: {
          host: envs.collaboratorsHost,
          port: envs.collaboratorsPort,
        },
      },
    ]),
  ],
})
export class CollaboratorsClient {}
