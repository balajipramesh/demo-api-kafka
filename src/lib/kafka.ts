import * as Promise from 'bluebird';
import * as producer from './producer';
import * as consumer from './consumer';
import { LogUtil } from '../util/log-util';

/**
 * Kafka producer and consumer kicker
 */
export function init(): Promise<void> {

  return producer.init().then(() => {
    return consumer.init().then(() => {
      LogUtil.info('Successfully initialized Kafka.');
    });
  });

}
