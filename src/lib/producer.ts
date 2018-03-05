import * as Promise from 'bluebird';
import * as kafkaNode from 'kafka-node';
import * as moment from 'moment';
import * as config from 'config';
import { LogUtil } from '../util/log-util';
import { demoMessageSchema } from '../kafka-support/model/demo-message-schema';

let client: any = null;
let producer: any = null;

/**
 * Kafka producer initalializer
 */
export function init(): Promise<void> {

  return new Promise<void> ((resolve, reject) => {

    // Get kafka configuration settings.
    const connectionString: any = config.get('kafka.connectionString');
    const clientID: any = config.get('kafka.clientID') ? config.get('kafka.clientID') : 'demo-kafka';

    // Producer topic.
    const PRODUCER_TOPIC = config.get('kafka.topics.producer') ? config.get('kafka.topics.producer') : 'demo-producer';

    // Create a new KafkaNode client.
    client = new kafkaNode.Client(
      connectionString,
      clientID
    );

    // Create a producer.
    producer = new kafkaNode.Producer(client);

    // Handle producer error.
    producer.on('error', (err) => {
      LogUtil.error(err, 'An error occurred initializing the Kafka producer.');
      reject(err);
    });

    // Producer is ready.
    producer.on('ready', () => {

      LogUtil.info('Kafka producer is ready.');

      // Create the producer topic. If it already exists, it will not overwrite or modify the topic.
      producer.createTopics([PRODUCER_TOPIC], true, (err, data) => {
        if (err) {
          LogUtil.error(err, 'An error occurred creating the producer topic.');
          reject(err);
        } else {
          LogUtil.info('The following topic(s) were verified or created.', data);
          resolve();
        }
      });

    });

  });

}

/**
 * Helper method to publish demo messages
 * @param to Message addressed to
 * @param subject Message subject
 * @param body Message content
 */
export function publishDemoMessage(to: string, subject: string, body: string): Promise<any> {
  return new Promise<void> ((resolve, reject) => {
    const PRODUCER_TOPIC = config.get('kafka.topics.producer') ? config.get('kafka.topics.producer') : 'demo-producer';

    const timestamp = moment().unix();

    // Create a message through the Avro schema.
    const message = demoMessageSchema.toString({
      to: to,
      subject: subject,
      content: body,
      timestamp: timestamp
    });

    // Create the Kafka payload.
    const payload: Array<any> = [{
      topic: PRODUCER_TOPIC,
      messages: message
    }];

    // Send the message.
    producer.send(payload, (err, data) => {
      if (err) {
        return reject(err);
      }
      LogUtil.info('Sent messages to Kafka.', data);
      return resolve(data);
    });

  });

}
