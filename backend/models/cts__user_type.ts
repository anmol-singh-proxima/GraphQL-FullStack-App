'use strict';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class cts_user_type extends Model {
  public id!: string;
  static associate: any;
}

export default function(sequelize: Sequelize) {
  cts_user_type.init(
    {
      type_id: { 
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      type_name: { type: DataTypes.STRING },
    }, {
      sequelize,
      modelName: 'cts_user_type',
      tableName: 'cts_user_type',
      timestamps: false,
    }
  )

  return cts_user_type;
}