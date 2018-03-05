import * as bunyan from 'bunyan';
import * as config from 'config';
let logConf: any = {
  level: 'ERROR',
  name: 'demo-kafka'
};

if (config.has('log')) {
  logConf = config.get('log');
}

/**
 * Utility method to setup logger
 */
export let LogUtil = bunyan.createLogger({
  name: logConf.name,
  stream: process.stdout,
  level: logConf.level
});
