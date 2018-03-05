import * as express from 'express';
import {ErrorResponse} from './error-response';

/**
 * Generic error responder. Returns caught errors in our 'error response' format.
 * Will set a status code of 500 unless the status was previously set by the thrower.
 *
 * @param err The error we use to consturct our response object
 * @param req The Request object
 * @param res The Response object we use to return status codes and JSON objects
 * @param next The NextFunction object
 */
export function generalErrorResponder(err: any, req: express.Request, res: express.Response, next: express.NextFunction): void {

  let errRes: ErrorResponse;

  if (err instanceof Error) {
    errRes = {
      message: err.name,
      details: err.message
    };
  } else {
    errRes = {
      message: 'Error',
      details: err.toString()
    };
  }
  res.statusCode = err.status || err.statusCode || 500;
  res.json(errRes);
}
