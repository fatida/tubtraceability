import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database'

interface StatusAttributes {
  id: number
  machine: string
  status: number
  createdAt?: Date
  updatedAt?: Date
}

class Status extends Model<StatusAttributes> implements StatusAttributes {
  public id!: number
  public machine!: string
  public status!: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Status.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    machine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_date',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_date',
    },
  },
  {
    sequelize,
    modelName: 'status',
    tableName: 'status',
    timestamps: true,
    underscored: true,
  }
)

export default Status
