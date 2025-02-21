// import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';

// import { envs, TRANSACTIONS_MICROSERVICE } from 'src/config';

// @Module({
//   imports: [
//     ClientsModule.register([
//       {
//         name: TRANSACTIONS_MICROSERVICE,
//         transport: Transport.TCP,
//         options: {
//           host: envs.transactionsHost,
//           port: envs.collaboratorsPort,
//         },
//       },
//     ]),
//   ],
//   exports: [ClientsModule],
// })
// export class TransactionsClientMS {}
