import {ApiError} from './api-error';

/**
 * Error to represent HTTP 503 Service Unavailable
 */
export class ServiceUnavailableError extends ApiError {
  constructor(message: string) {
    super('ServiceUnavailableError', 503, message);
  }
}
