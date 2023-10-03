import { sequelize } from './config/database'
import logger from './utility/logger'
import dataprocessing from './service/dataprocessing'
import opcuaserver from './service/opcuaserver'
import { config } from './config/config'
import express from 'express'
import router from './controller/api/route'
import http from 'http' 

import WebSocketManager from './utility/websocket' 

const app = express()
app.use(express.json())
app.use('/', router)

const server = http.createServer(app) // Create an HTTP server using the express app

const webSocketManager = WebSocketManager.getInstance() // Get the WebSocketManager instance

// Connect and Sync to DB
const connectToDB = async () => {
  while (true) {
    try {
      logger.info('Trying to Sync Database')
      await sequelize.sync()
      logger.info('Database synchronized')

      server.listen(config.application.port, () => { // Start the server using the HTTP server
        logger.info(`Server is running on ${config.application.port}`)
      })

      webSocketManager.start(server) // Start the WebSocketManager with the HTTP server

      // Once database connections is established, start data processing services
      setTimeout(() => {
        dataprocessing.initdataprocessing()
      }, 1000)

      setTimeout(() => {
        opcuaserver.initopcuaserver()
      }, 1000)

      // If we reach here, the connection was successful, so we break out of the loop
      break
    } catch (error) {
      logger.error('Error synchronizing database: ' + error)
      // Add a delay before retrying
      logger.info('Re-Trying to Connect Database')
      await new Promise(resolve => setTimeout(resolve, 5000)) // 5000ms delay before retrying
    }
  }
}
// Call the function to connect to the DB
connectToDB()
