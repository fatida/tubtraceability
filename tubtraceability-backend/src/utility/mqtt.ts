import * as mqtt from 'mqtt';
import logger from './logger'
import { IMessage } from '../dataset/common'

// type Message = {
//   seq: number;
//   vals: {
//     id: number;
//     qc: number;
//     ts: Date;
//     val: number | string;
//   }[];
// };

class MQTTClient {
  public client: mqtt.MqttClient;
  constructor(brokerUrl: string, username: string, password: string) {
    this.client = mqtt.connect(brokerUrl, {
      username: username,
      password: password
    });

    this.client.on('connect', () => {
      logger.info(`Connected to MQTT broker at ${brokerUrl}`);
    });

    this.client.on('error', (error) => {
      logger.error('Error connecting to MQTT broker:', error);
    });
  }

  public subscribe(topic: string) {
    this.client.subscribe(topic, (error) => {
      if (error) {
        logger.error('Error subscribing to topic:', error);
      } else {
        logger.info(`Subscribed to topic: ${topic}`);
      }
    });
  }

  public publish(topic: string, message: IMessage) {
    const data = JSON.stringify(message)
    this.client.publish(topic, data, (error) => {
      if (error) {
        logger.error('Error publishing message:', error);
      } else {
        logger.info(`Published to topic: ${topic}, message: ${data}`);
      }
    });
  }

  public meta(topic: string, message: any) {
    const data = JSON.stringify(message)
    this.client.publish(topic, data, (error) => {
      if (error) {
        logger.error('Error publishing message:', error);
      } else {
        logger.info(`Published to topic: ${topic}, message: ${data}`);
      }
    });
  }
}

export default MQTTClient;
