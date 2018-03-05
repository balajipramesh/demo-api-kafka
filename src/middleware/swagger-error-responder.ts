import * as express from 'express';
import { ErrorResponse } from './error-response';
import { SwaggerErrorResponse } from './swagger-error-response';

/**
 * Error handler which examines the thrown err object, and tests for properties set by swagger-tools validator
 *
 * @param err The error we use to consturct our response object
 * @param req The Request object
 * @param res The Response object we use to return status codes and JSON objects
 * @param next The NextFunction object
 */
export function swaggerErrorResponder(err: SwaggerErrorResponse, req: express.Request, res: express.Response, next: express.NextFunction): void {

  if (err instanceof Error && err.code && err.failedValidation) {
    let errRes: ErrorResponse = {
      message: err.message,
      details: err.results
    };
    res.status(400).json(errRes);
  } else {
    next(err);
  }

}
