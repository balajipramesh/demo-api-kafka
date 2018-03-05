import * as Promise from 'bluebird';
import * as express from 'express';

import {swaggerErrorResponder} from './middleware/swagger-error-responder';
import {generalErrorResponder} from './middleware/general-error-responder';

/**
 * Promises a boolean depending on the initialization of the application
 *
 * @param app The Application object to which we assign middleware functions
 */
export function initialize(app: express.Application): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    app.use(swaggerErrorResponder);
    app.use(generalErrorResponder);
    resolve(true);
  });
}
