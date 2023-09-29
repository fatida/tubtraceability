"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
const logger_1 = __importDefault(require("./utility/logger"));
const opcuaserver_1 = __importDefault(require("./service/opcuaserver"));
// Connect and Sync to DB
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.sequelize.sync();
        logger_1.default.info('Database synchronized');
        // Once database connections is established, start data processing services
        // setTimeout(() => {
        //   dataprocessing.initdataprocessing()
        // }, 1000)
        setTimeout(() => {
            opcuaserver_1.default.initopcuaserver();
        }, 1000);
    }
    catch (error) {
        logger_1.default.error('Error synchronizing database: ' + error);
    }
}))();
