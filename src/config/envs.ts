import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  GATEWAY_PORT: number;

  ROOMS_MICROSERVICE_PORT: number;
  ROOMS_MICROSERVICE_HOST: string;

  COLLABORATORS_MICROSERVICE_PORT: number;
  COLLABORATORS_MICROSERVICE_HOST: string;

  TRANSACTIONS_MICROSERVICE_PORT: number;
  TRANSACTIONS_MICROSERVICE_HOST: string;
}

const envSchema = joi
  .object({
    GATEWAY_PORT: joi.number().required(),

    ROOMS_MICROSERVICE_PORT: joi.number().required(),
    ROOMS_MICROSERVICE_HOST: joi.string().required(),

    COLLABORATORS_MICROSERVICE_PORT: joi.number().required(),
    COLLABORATORS_MICROSERVICE_HOST: joi.string().required(),

    TRANSACTIONS_MICROSERVICE_PORT: joi.number().required(),
    TRANSACTIONS_MICROSERVICE_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  gatewayPort: envVars.GATEWAY_PORT,

  roomsPort: envVars.ROOMS_MICROSERVICE_PORT,
  roomsHost: envVars.ROOMS_MICROSERVICE_HOST,

  collaboratorsPort: envVars.COLLABORATORS_MICROSERVICE_PORT,
  collaboratorsHost: envVars.COLLABORATORS_MICROSERVICE_HOST,

  transactionsPort: envVars.TRANSACTIONS_MICROSERVICE_PORT,
  transactionsHost: envVars.TRANSACTIONS_MICROSERVICE_HOST,
};
