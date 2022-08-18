import { Joi } from 'express-validation';

/**
 * Vaccine Summary route validation
 */
const vaccineSummaryValidation = {
  query: Joi.object({
    c: Joi.string().required(),
    dateFrom: Joi.string().required(),
    dateTo: Joi.string().required(),
    range: Joi.number().required(),
  }),
};

/**
 * Export all
 */
export = {
  vaccineSummaryValidation,
};
