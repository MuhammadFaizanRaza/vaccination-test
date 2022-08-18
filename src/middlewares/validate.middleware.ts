import { validate, schema } from 'express-validation';

/**
 * Validate middleware from express-validation with options set
 * @param {object} schema joi schema object
 */
export = (validationSchema: schema) => validate(validationSchema, { keyByField: true }, { abortEarly: false });
