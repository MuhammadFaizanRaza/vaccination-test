import httpStatus from 'http-status';

export = {
  // this is used for any internal server error
  UNKOWN_PROBLEM: {
    messageKey: 'UNKOWN_PROBLEM',
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    message: 'An unkown problem occured while processing your request',
  },
  MISSING_FILE_UPLOAD_PARAMETERS: {
    messageKey: 'MISSING_FILE_UPLOAD_PARAMETERS',
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Required parameters missing for file upload',
  },
};
