import { sequelize } from './config/database'
import logger from './utility/logger'
import dataprocessing from './service/dataprocessing'
import opcuaserver from './service/opcuaserver'
import { config } from './config/config'
import express from 'express'
import router from './controller/api/route'
import http from 'http' 
import cors from 'cors'
import WebSocketManager from './utility/websocket' 

const app = express()
const server = http.createServer(app)
const webSocketManager = WebSocketManager.getInstance()

// Move these lines above app.use('/', router)
app.use(express.json())

const corsOptions = {
  origin: '*', // or specify your frontend's origin (e.g., http://localhost:8081)
  credentials: true,  // Allow cookies and credentials
};

app.use(cors(corsOptions))
app.use('/', router)



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
