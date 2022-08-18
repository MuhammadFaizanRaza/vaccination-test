import { Response } from 'express';
import httpStatus from 'http-status';
import BaseResponse from './interfaces/base-response.interface';

/**
 * Response Handler to send response in case of request success
 * Using this handler ensures that system has consistent response pattern
 * @param {object} res express response object
 * @param {string} messageKey  messageKey for request response
 * @param {string} message  message for request response
 * @param {object} data response data for request if available
 * @param {string} statusCode status code for request if available
 */
export = (res: Response, messageKey: string, message: string, data = {}, statusCode = httpStatus.OK): void => {
  res.status(statusCode).json({
    status: true,
    statusCode,
    messageKey,
    message,
    data,
  });
};
