import { Sequelize } from 'sequelize'
import {config} from './config'

export const sequelize = new Sequelize(config.database.database, config.database.user, config.database.password, {
  host: config.database.host,
  dialect: 'postgres',
});