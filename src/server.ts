import * as config from 'config';
import * as express from 'express';
import * as Promise from 'bluebird';
import * as swagger from './swagger';
import * as middleware from './middleware';
import { LogUtil } from './util/log-util';
import { AppUtil } from './util/app-util';
import  * as kafka from './lib/kafka';
const SWAGGER_UX_PATH = '/docs';

let app: express.Application = express();
let port: number = config.get('port') as number;
let rootPath = '/demo/v1';

if (isNaN(port)) {
  console.error(`Invalid port config value: ${port}`);
  process.exit(1);
}

AppUtil.setupCommonStack(app, rootPath);

// Initialize swagger and start service
swagger.initialize(app)
  .then(() => { return middleware.initialize(app); })
  .then(() => { return startService(app); })
  .then(() => { LogUtil.info('Completely up!'); })
  .catch(handleError);

// Initialize kafka listener and producer
kafka.init().catch((err) => {
  LogUtil.error(err, 'An error occurred initializing Kafka support.');
});

function startService(app: express.Application): void {
  let port: number = config.get('port') as number;
  if (isNaN(port)) {
    new Error(`invalid port config value: ${port}`);
  }
  app.listen(port);
  LogUtil.info('Demo server now istening on port ' + port + '...');
}

function handleError(err): void {
  console.log('An error occurred starting the service...');
  console.log(err);
  process.exit(1);
}

export const server = app;
