import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

interface ProcessAttributes {
  uniqueid: number;
  imm: string;
  date: string;
  datamatrix: string;
  mouldid: string;
  moulddescription: string;
  materialnumber: string;
  materialdescription: string;
  barcode: string;
  weight: number;
  scrap_barcode: string;
  scrap_reason: number;
  energy: object;
  cycle: object;
  secondarydata: object;
  createdAt?: Date; // Add optional createdAt field
  updatedAt?: Date; // Add optional updatedAt field
}

class Process extends Model<ProcessAttributes> implements ProcessAttributes {
  public uniqueid!: number;
  public imm!: string;
  public date!: string;
  public datamatrix!: string;
  public mouldid!: string;
  public moulddescription!: string;
  public materialnumber!: string;
  public materialdescription!: string;
  public barcode!: string;
  public weight!: number;
  public scrap_barcode!: string;
  public scrap_reason!: number;
  public energy!: object;
  public cycle!: object;
  public secondarydata!: object;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Process.init(
  {
    uniqueid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    imm: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.STRING,
    },
    datamatrix: {
      type: DataTypes.STRING,
    },
    mouldid: {
      type: DataTypes.STRING,
    },
    moulddescription: {
      type: DataTypes.STRING,
    },
    materialnumber: {
      type: DataTypes.STRING,
    },
    materialdescription: {
      type: DataTypes.STRING,
    },
    barcode: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    scrap_barcode: {
      type: DataTypes.STRING,
    },
    scrap_reason: {
      type: DataTypes.INTEGER,
    },
    energy: {
      type: DataTypes.JSONB,
    },
    cycle: {
      type: DataTypes.JSONB,
    },
    secondarydata: {
      type: DataTypes.JSONB,
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
    modelName: 'process',
    tableName: 'process',
    timestamps: true,
    underscored: true, // Enable underscored naming convention
  }
);

export default Process;
