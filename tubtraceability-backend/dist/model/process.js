"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Process extends sequelize_1.Model {
}
Process.init({
    uniqueid: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    imm: {
        type: sequelize_1.DataTypes.STRING,
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
    },
    datamatrix: {
        type: sequelize_1.DataTypes.STRING,
    },
    mouldid: {
        type: sequelize_1.DataTypes.STRING,
    },
    moulddescription: {
        type: sequelize_1.DataTypes.STRING,
    },
    materialnumber: {
        type: sequelize_1.DataTypes.STRING,
    },
    materialdescription: {
        type: sequelize_1.DataTypes.STRING,
    },
    barcode: {
        type: sequelize_1.DataTypes.STRING,
    },
    weight: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    scrap_barcode: {
        type: sequelize_1.DataTypes.STRING,
    },
    scrap_reason: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    energy: {
        type: sequelize_1.DataTypes.JSONB,
    },
    cycle: {
        type: sequelize_1.DataTypes.JSONB,
    },
    secondarydata: {
        type: sequelize_1.DataTypes.JSONB,
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
    modelName: 'process',
    tableName: 'process',
    timestamps: true,
    underscored: true, // Enable underscored naming convention
});
exports.default = Process;
