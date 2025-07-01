import { db } from '../database/config'
import { DataTypes, Model, Sequelize } from 'sequelize'

export const Message = db.define('messages', {
  uid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  from: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'uid',
    },
  },
  to: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'uid',
    },
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {})

export interface MessageAttributes {
  uid: string
  from: string
  to: string
  message: string
  created_at?: Date
  updated_at?: Date
}

export interface MessageInstance extends Model<MessageAttributes>, MessageAttributes {}
