import { sequelize } from './config/database'
import logger from './utility/logger'
import dataprocessing from './service/dataprocessing'
import opcuaserver from './service/opcuaserver'


// Connect and Sync to DB
// Define a function to connect and sync to DB
const connectToDB = async () => {
  while (true) {
    try {
      logger.info('Trying to Sync Database')
      await sequelize.sync()
      logger.info('Database synchronized')
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
      logger.info('Re-Tring to Connect Database')
      await new Promise(resolve => setTimeout(resolve, 5000)) // 5000ms delay before retrying
    }
  }
}

// Call the function to connect to the DB
connectToDB()
