import ErrorProperties from 'libraries/interfaces/error.factory.interface';
import APIError from '../exceptions/apiError.exception';

/**
 * Error Factory class
 * @typedef ErrorFactory
 */
export default class ErrorFactory {
  /**
   * Return an error from the passed properties
   * @param {object} errorProperties passed error properties defined in mappings/errors
   * @returns {Error}
   */
  static getError(errorProperties?: ErrorProperties): APIError {
    /**
     * If no properties provided, return UNKOWN Error
     */
    if (!errorProperties) {
      return new APIError();
    }

    /**
     * Create Error from Properties
     */
    return new APIError(errorProperties.message, errorProperties.messageKey, errorProperties.statusCode);
  }
}
