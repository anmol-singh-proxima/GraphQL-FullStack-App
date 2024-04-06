/**
 * Filename: models/cts_user_role.ts
 * Description: 
 * 
 * Create Date: 05 Apr 2024
 */

'use strict';
import { DataTypes, HasOne, Model, Sequelize } from 'sequelize';
import { cts_user_type } from './cts_user_type';

export class cts_user_role extends Model {
  public id!: string;
  static associate: any;
  static CtsUserType: HasOne<cts_user_role, cts_user_type>;
}

export default function(sequelize: Sequelize) {
  cts_user_role.init(
    {
      role_id: { 
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      role_name: { 
        type: DataTypes.STRING,
        allowNull: false,
     },
      type_id: { 
        type: DataTypes.STRING,
        references: {
          model: 'cts_user_type',
          key: 'type_id'
        },
        field: 'type_id',
      },
    }, {
      sequelize,
      modelName: 'cts_user_role',
      tableName: 'cts_user_role',
      timestamps: false,
    }
  )

  cts_user_role.associate = function(models: any) {
    cts_user_role.CtsUserType = cts_user_role.hasOne(
      models.cts_user_type,
      { foreignKey: "type_id", sourceKey: "type_id" }
    );
  }

  return cts_user_role;
}