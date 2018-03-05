import * as Promise from 'bluebird';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';
import * as express from 'express';

let swagger = require('swagger-tools');

/**
 * Promises a boolean depending on the initialization of the application
 *
 * @param app The Application object to which we assign middleware functions
 */
export function initialize(app: express.Application): Promise<boolean> {

  let swaggerPath = path.resolve(__dirname, './api.yaml');
  let swaggerDefinition = yaml.safeLoad(fs.readFileSync(swaggerPath, 'utf8'));
  let controllerPath = path.resolve(__dirname, './actions');

  return new Promise<boolean>((resolve, reject) => {
    swagger.initializeMiddleware(swaggerDefinition, (middleware) => {
      app.use(middleware.swaggerMetadata());
      app.use(middleware.swaggerValidator({ validateResponse: false }));
      app.use(middleware.swaggerRouter({ controllers: controllerPath }));
      app.use(middleware.swaggerUi());
      resolve(true);
    });
  });
}
