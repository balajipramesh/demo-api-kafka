import {ApiError} from './api-error';

/**
 * Error to represent HTTP 400 Bad request
 */
export class BadRequestError extends ApiError {
  constructor(message: string) {
    super('BadRequestError', 400, message);
  }
}
