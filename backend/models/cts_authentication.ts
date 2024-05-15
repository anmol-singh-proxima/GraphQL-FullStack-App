/**
 * Filename: models/cts_authentication.ts
 * Description: 
 * 
 * Create Date: 11 May 2024
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export class cts_authentication extends Model {
  public id!: string;
  static associate: any;
}

export default function (sequelize: Sequelize) {
  cts_authentication.init({
    token: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_dt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },
    deleted_dt: { type: DataTypes.DATE },
  }, {
    sequelize,
    modelName: 'cts_authentication',
    tableName: 'cts_authentication',
    timestamps: false,
  });

  return cts_authentication;
}