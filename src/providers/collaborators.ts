import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { COLLABORATORS_MICROSERVICE, envs } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: COLLABORATORS_MICROSERVICE,
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
        name: COLLABORATORS_MICROSERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.collaboratorsHost,
          port: envs.collaboratorsPort,
        },
      },
    ]),
  ],
})
export class CollaboratorsClientMS {}
