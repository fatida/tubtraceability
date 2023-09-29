import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database'

interface PrinterAttributes {
  id: number; // Add id field
  imm: string;
  type: string;
  ip: string;
  port: number;
  createdAt?: Date; // Add optional createdAt field
  updatedAt?: Date; // Add optional updatedAt field

}

class Printer extends Model<PrinterAttributes> implements PrinterAttributes {
  public id!: number; // Define id field
  public imm!: string;
  public type!: string;
  public ip!: string;
  public port!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

Printer.init(
  {
    id: {
      type: DataTypes.INTEGER, // Define id as an integer type
      autoIncrement: true, // Enable auto-increment for id
      primaryKey: true, // Make id the primary key
    },
    imm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    port: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_date', // Adjust field name for PostgreSQL convention
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_date', // Adjust field name for PostgreSQL convention
    },
  },
  {
    sequelize,
    modelName: 'printer',
    tableName: 'printer',
    timestamps: true,
    underscored: true,
  }
);

export default Printer;
