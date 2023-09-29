import logger from '../utility/logger'
import MQTTClient from '../utility/mqtt'
import { config } from '../config/config'
import { opcuaservermetadata } from '../dataset/opcuaservermeta'

const opcuaserver = {
    initopcuaserver(){
        logger.info("OPC UA Server is initialized.")
        try {
            const mqttClient = new MQTTClient(
                config.opcuaserver.url,
                config.opcuaserver.username,
                config.opcuaserver.password
            )
            logger.info("Trying to connect databus")
            mqttClient.client.on('connect', () => {
                logger.info("MQTT Client is connected to databus")
                
                // Send OPC UA Server Meta Data
                setTimeout(() => {
                mqttClient.meta(config.opcuaserver.meta, opcuaservermetadata )
                }, 1000);

            });
        } catch (error) {
            logger.error(error)
        }
    }
}

export default opcuaserver