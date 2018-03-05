import * as Promise from 'bluebird';
import * as kafkaNode from 'kafka-node';
import * as config from 'config';
import { LogUtil } from '../util/log-util';

/**
 * Function to initialize the kafka consumer
 */
export function init(): Promise<void> {

  return new Promise<void> ((resolve, reject) => {

    // Get kafka configuration settings.
    const connectionString: any = config.get('kafka.connectionString');
    const clientID: any = config.get('kafka.clientID') ? config.get('kafka.clientID') : 'demo-kafka';
    const consumerGroupID: any = config.get('kafka.consumerGroupID') ? config.get('kafka.consumerGroupID') : 'demo-kafka-cg';

    // Consumer topic.
    const CONSUMER_TOPIC = config.get('kafka.topics.consumer') ? config.get('kafka.topics.consumer') : 'demo-listener';

    // Consumer group options.
    const options: any = {
      id: clientID,
      host: connectionString,
      groupId: consumerGroupID,
      sessionTimeout: 15000,
      protocol: ['roundrobin'],
      fromOffset: 'latest',
      encoding: 'utf8'
    };

    // Create consumer group.
    const consumer = new kafkaNode.ConsumerGroup(options, [CONSUMER_TOPIC]);

    // Handle error.
    consumer.on('error', (err) => {
      LogUtil.error(err, 'An error occurred connecting to a Kafka topic.');
      reject(err);
    });

    // Handle messages.
    consumer.on('message', (message: any) => {
      /* Just log the message for demo purpose.
       * Note: This is where the controller for consumer would be invoked,
       *       passing message as the argument to the controller.
       */
      LogUtil.info('Message received: ', '\'' + message.value + '\'');
    });

    // Log to indicate the listener is up and running.
    LogUtil.info('Listening for messages on Kafka topic %s.', CONSUMER_TOPIC);

    // Resolve.
    resolve();
  });
}
