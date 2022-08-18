import path from 'path';
import Joi from '@hapi/joi';
import dotEnv from 'dotenv';

// Validate NODE_ENV first, only specified NODE_ENV allowed
const { error: envError, value } = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),
})
  .required()
  .validate(process.env, { allowUnknown: true });

if (envError) {
  throw new Error(`Environment Validation Error: ${envError.message}`);
}

// read and configure env file according to provided NODE_ENV
let envFilePath;
if (value.NODE_ENV === '') {
  envFilePath = path.resolve(__dirname, '..', '..', `.env`);
} else {
  envFilePath = path.resolve(__dirname, '..', '..', `.env.${value.NODE_ENV}`);
}
const envConfig = dotEnv.config({ path: envFilePath });
if (envConfig.error) {
  throw new Error(`Environment Configuration File Error: ${envConfig.error}`);
}

// validate all env variables in configuration
const { error: envConfigError, value: envVars } = Joi.object({
  // since it is already validated
  NODE_ENV: Joi.string().default(value.NODE_ENV),
  PORT: Joi.number().default(4000),

  MONGO_HOST: Joi.string().required(),
  MONGO_PORT: Joi.number().default(27017),
  MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false),
  }),
})
  .required()
  .validate(process.env, { allowUnknown: true });

if (envConfigError) {
  throw new Error(`Environment Configuration Error: ${envConfigError.message}`);
}

// Export all configuration
export = {
  ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  APP_URL: envVars.APP_URL,
  MONGOOSE_DEBUG: envVars.MONGOOSE_DEBUG,

  MONGO: {
    HOST: envVars.MONGO_HOST,
    PORT: envVars.MONGO_PORT,
  },
};
