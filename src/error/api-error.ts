/**
 * Base class to represent API Errors
 */
export class ApiError extends Error {

  statusCode: number;

  constructor(name: string, statusCode: number, message: string) {
    super();
    this.name = name;
    this.statusCode = statusCode;
    this.message = message;
  }
}
