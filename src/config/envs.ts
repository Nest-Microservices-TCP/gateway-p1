import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  GATEWAY_PORT: number;

  // ROOMS_MICROSERVICE_PORT: number;
  // ROOMS_MICROSERVICE_HOST: string;

  KAFKA_BROKER: string;

  ROOMS_KAFKA_CLIENT_ID: string;
  ROOMS_KAFKA_GROUP_ID: string;
}

const envSchema = joi
  .object({
    GATEWAY_PORT: joi.number().required(),

    // ROOMS_MICROSERVICE_PORT: joi.number().required(),
    // ROOMS_MICROSERVICE_HOST: joi.string().required(),

    KAFKA_BROKER: joi.string().required(),

    ROOMS_KAFKA_CLIENT_ID: joi.string().required(),
    ROOMS_KAFKA_GROUP_ID: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  gatewayPort: envVars.GATEWAY_PORT,

  // roomsPort: envVars.ROOMS_MICROSERVICE_PORT,
  // roomsHost: envVars.ROOMS_MICROSERVICE_HOST,

  KAFKA_BROKER: envVars.KAFKA_BROKER,

  ROOMS_KAFKA_CLIENT_ID: envVars.ROOMS_KAFKA_CLIENT_ID,
  ROOMS_KAFKA_GROUP_ID: envVars.ROOMS_KAFKA_GROUP_ID,
};
