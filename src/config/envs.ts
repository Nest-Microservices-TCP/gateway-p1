import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  GATEWAY_PORT: number;

  ROOMS_MICROSERVICE_HOST: string;
  ROOMS_MICROSERVICE_PORT: number;

  COLLABORATORS_MICROSERVICE_HOST: string;
  COLLABORATORS_MICROSERVICE_PORT: number;

  TRANSACTIONS_MICROSERVICE_HOST: string;
  TRANSACTIONS_MICROSERVICE_PORT: number;

  RABBITMQ_HOST: string;
  RABBITMQ_PORT: number;
}

const envSchema = joi
  .object({
    GATEWAY_PORT: joi.number().required(),

    ROOMS_MICROSERVICE_HOST: joi.string().required(),
    ROOMS_MICROSERVICE_PORT: joi.number().required(),

    COLLABORATORS_MICROSERVICE_HOST: joi.string().required(),
    COLLABORATORS_MICROSERVICE_PORT: joi.number().required(),

    TRANSACTIONS_MICROSERVICE_HOST: joi.string().required(),
    TRANSACTIONS_MICROSERVICE_PORT: joi.number().required(),

    RABBITMQ_HOST: joi.string().required(),
    RABBITMQ_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  gatewayPort: envVars.GATEWAY_PORT,

  roomsMicroserviceHost: envVars.ROOMS_MICROSERVICE_HOST,
  roomsMicroservicePort: envVars.ROOMS_MICROSERVICE_PORT,

  collaboratorsMicroserviceHost: envVars.COLLABORATORS_MICROSERVICE_HOST,
  collaboratorsMicroservicePort: envVars.COLLABORATORS_MICROSERVICE_PORT,

  transactionsMicroserviceHost: envVars.TRANSACTIONS_MICROSERVICE_HOST,
  transactionsMicroservicePort: envVars.TRANSACTIONS_MICROSERVICE_PORT,

  rabbitMqHost: envVars.RABBITMQ_HOST,
  rabbitMqPort: envVars.RABBITMQ_PORT,
};
