import { sequelize } from './config/database'
import logger from './utility/logger'
import dataprocessing from './service/dataprocessing';
import opcuaserver from './service/opcuaserver'


// Connect and Sync to DB
(async () => {
  try {
    await sequelize.sync();
    logger.info('Database synchronized')    
    // Once database connections is established, start data processing services
    setTimeout(() => {
      dataprocessing.initdataprocessing()
    }, 1000)

    setTimeout(() => {
      opcuaserver.initopcuaserver()
    }, 1000)

    
    
  } catch (error) {
    logger.error('Error synchronizing database: ' + error)
  }
})();


