import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  GATEWAY_PORT: number;

  ROOMS_PORT: number;
  ROOMS_HOST: string;

  COLLABORATORS_PORT: number;
  COLLABORATORS_HOST: string;
}

const envSchema = joi
  .object({
    GATEWAY_PORT: joi.number().required(),

    ROOMS_PORT: joi.number().required(),
    ROOMS_HOST: joi.string().required(),

    COLLABORATORS_PORT: joi.number().required(),
    COLLABORATORS_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  gatewayPort: envVars.GATEWAY_PORT,

  roomsPort: envVars.ROOMS_PORT,
  roomsHost: envVars.ROOMS_HOST,

  collaboratorsPort: envVars.COLLABORATORS_PORT,
  collaboratorsHost: envVars.COLLABORATORS_HOST,
};
