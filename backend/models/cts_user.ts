/**
 * Filename: models/cts_user.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

import { DataTypes, Model, Sequelize, HasOne, BelongsToMany, HasMany } from 'sequelize';
import { cts_user_role } from './cts_user_role';
import { cts_project } from './cts_project';
import { cts_task } from './cts_task';

export class cts_user extends Model {
  public id!: string;
  static associate: any;
  static CtsUserRole: HasOne<cts_user, cts_user_role>;
  static CtsProjects: BelongsToMany<cts_user, cts_project>;
  static CtsTasks: HasMany<cts_user, cts_task>;
}

export default function (sequelize: Sequelize) {
  cts_user.init({
    user_id: {
      type: DataTypes.STRING(6),
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
    role_id: {
      type: DataTypes.STRING,
      references: {
        model: 'cts_user_role',
        key: 'role_id'
      },
      field: 'role_id',
      allowNull: false,
    },
    created_dt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    },
    created_by: {
      type: DataTypes.STRING(6),
      allowNull: false
    },
    deleted_dt: { type: DataTypes.DATE },
    deleted_by: { type: DataTypes.STRING(6) },
  }, {
    sequelize,
    modelName: 'cts_user',
    tableName: 'cts_user',
    timestamps: false,
  });

  cts_user.associate = function (models: any) {
    cts_user.CtsUserRole = cts_user.hasOne(
      models.cts_user_role,
      { foreignKey: "role_id", sourceKey: "role_id" }
    );
    cts_user.CtsProjects = cts_user.belongsToMany(
      models.cts_project, {
      through: 'cts_assignment',
      foreignKey: "user_id",
      otherKey: "project_id"
    }
    );
    cts_user.CtsTasks = cts_user.hasMany(
      models.cts_task, {
      foreignKey: "user_id",
      sourceKey: "user_id"
    }
    );
  }

  return cts_user;
}