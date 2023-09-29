"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Printer extends sequelize_1.Model {
}
Printer.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, // Make id the primary key
    },
    imm: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ip: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    port: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: 'created_date', // Adjust field name for PostgreSQL convention
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: 'updated_date', // Adjust field name for PostgreSQL convention
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'printer',
    tableName: 'printer',
    timestamps: true,
    underscored: true,
});
exports.default = Printer;
