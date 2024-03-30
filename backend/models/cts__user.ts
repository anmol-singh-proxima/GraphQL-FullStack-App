'use strict';
import { DataTypes, Model, Sequelize, HasOne } from 'sequelize';
import { cts_user_type } from './cts__user_type';

export class cts_user extends Model {
    public id!: string;
    static associate: any;
    static CTSUserType: HasOne<cts_user, cts_user_type>;
}

export default function(sequelize: Sequelize) {
  cts_user.init({
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    modelName: 'cts_user',
    tableName: 'cts_user',
    timestamps: false,
  });

  cts_user.associate = function(models: any) {
    cts_user.CTSUserType = cts_user.hasOne(
      models.cts_user_type,
      { foreignKey: "type_id", sourceKey: "type_id" }
    );
  }

  return cts_user;
}