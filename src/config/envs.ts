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

  KAFKA_BROKER: string;

  ROOMS_KAFKA_CLIENT_ID: string;
  ROOMS_KAFKA_GROUP_ID: string;

  TRANSACTIONS_KAFKA_CLIENT_ID: string;
  TRANSACTIONS_KAFKA_GROUP_ID: string;

  COLLABORATORS_KAFKA_CLIENT_ID: string;
  COLLABORATORS_KAFKA_GROUP_ID: string;
}

const envSchema = joi
  .object({
    GATEWAY_PORT: joi.number().required(),

    ROOMS_MICROSERVICE_PORT: joi.number().required(),
    ROOMS_MICROSERVICE_HOST: joi.string().required(),

    COLLABORATORS_MICROSERVICE_HOST: joi.string().required(),
    COLLABORATORS_MICROSERVICE_PORT: joi.number().required(),

    TRANSACTIONS_MICROSERVICE_HOST: joi.string().required(),
    TRANSACTIONS_MICROSERVICE_PORT: joi.number().required(),

    KAFKA_BROKER: joi.string().required(),

    ROOMS_KAFKA_CLIENT_ID: joi.string().required(),
    ROOMS_KAFKA_GROUP_ID: joi.string().required(),

    TRANSACTIONS_KAFKA_CLIENT_ID: joi.string().required(),
    TRANSACTIONS_KAFKA_GROUP_ID: joi.string().required(),

    COLLABORATORS_KAFKA_CLIENT_ID: joi.string().required(),
    COLLABORATORS_KAFKA_GROUP_ID: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  gatewayPort: envVars.GATEWAY_PORT,

  roomsHost: envVars.ROOMS_MICROSERVICE_HOST,
  roomsPort: envVars.ROOMS_MICROSERVICE_PORT,

  collaboratorsHost: envVars.COLLABORATORS_MICROSERVICE_HOST,
  collaboratorsPort: envVars.COLLABORATORS_MICROSERVICE_PORT,

  transactionsHost: envVars.TRANSACTIONS_MICROSERVICE_HOST,
  transactionsPort: envVars.TRANSACTIONS_MICROSERVICE_PORT,

  kafkaBroker: envVars.KAFKA_BROKER,

  roomsKafkaClientId: envVars.ROOMS_KAFKA_CLIENT_ID,
  roomsKafkaGroupId: envVars.ROOMS_KAFKA_GROUP_ID,

  transactionsKafkaClientId: envVars.TRANSACTIONS_KAFKA_CLIENT_ID,
  transactionsKafkaGroupId: envVars.TRANSACTIONS_KAFKA_GROUP_ID,

  collaboratorsKafkaClientId: envVars.COLLABORATORS_KAFKA_CLIENT_ID,
  collaboratorsKafkaGroupId: envVars.COLLABORATORS_KAFKA_GROUP_ID,
};
