"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
exports.sequelize = new sequelize_1.Sequelize(config_1.config.database.database, config_1.config.database.user, config_1.config.database.password, {
    host: config_1.config.database.host,
    dialect: 'postgres',
});
