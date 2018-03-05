export interface SwaggerErrorResponse {
  message: string;
  code: string;
  failedValidation: boolean;
  results: any;
  details?: any;
}
