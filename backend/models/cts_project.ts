/**
 * Filename: models/cts_project.ts
 * Description: 
 * 
 * Create Date: 06 Apr 2024
 */

import { DataTypes, Model, Sequelize, BelongsToMany, HasMany } from 'sequelize';
import { cts_user } from './cts_user';
import { cts_task } from './cts_task';

export class cts_project extends Model {
  public id!: string;
  static associate: any;
  static CtsUsers: BelongsToMany<cts_project, cts_user>;
  static CtsTasks: HasMany<cts_user, cts_task>;
}

export default function (sequelize: Sequelize) {
  cts_project.init({
    project_id: {
      type: DataTypes.STRING(6),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    release: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING },
    progress: { type: DataTypes.STRING },
    project_manager: { type: DataTypes.STRING },
    project_lead: { type: DataTypes.STRING },
    start_date: { type: DataTypes.DATEONLY },
    end_date: { type: DataTypes.DATEONLY },

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
    modelName: 'cts_project',
    tableName: 'cts_project',
    timestamps: false,
  });

  cts_project.associate = function (models: any) {
    cts_project.CtsUsers = cts_project.belongsToMany(
      models.cts_user, {
      through: 'cts_assignment',
      foreignKey: "project_id",
      otherKey: "user_id"
    }
    )
    cts_project.CtsTasks = cts_project.hasMany(
      models.cts_task, {
      foreignKey: "project_id",
      sourceKey: "project_id"
    }
    );
  }

  return cts_project;
}