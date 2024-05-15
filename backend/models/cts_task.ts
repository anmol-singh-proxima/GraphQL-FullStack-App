/**
 * Filename: models/cts_task.ts
 * Description: 
 * 
 * Create Date: 06 Apr 2024
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export class cts_task extends Model {
  public id!: string;
  static associate: any;
}

export default function (sequelize: Sequelize) {
  cts_task.init({
    task_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      // allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING },
    progress: { type: DataTypes.STRING },
    priority: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    story_points: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: { type: DataTypes.DATEONLY },
    end_date: { type: DataTypes.DATEONLY },

    user_id: {
      type: DataTypes.STRING(6),
      references: {
        model: 'cts_user',
        key: 'user_id'
      },
      field: 'user_id',
      allowNull: true,
    },
    project_id: {
      type: DataTypes.STRING(6),
      references: {
        model: 'cts_project',
        key: 'project_id'
      },
      field: 'project_id',
      allowNull: false,
    },

    // Date of the task being created in the first place
    created_dt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    },
    // Who created the task in the first place
    created_by: {
      type: DataTypes.STRING(6),
      allowNull: false
    },

    // Date of the task being deleted
    deleted_dt: { type: DataTypes.DATE },
    // Who deleted the task
    deleted_by: { type: DataTypes.STRING(6) },

    // Date of assigning the task to the user
    assigned_dt: {
      type: DataTypes.DATE,
      // allowNull: false, 
      // defaultValue: Sequelize.fn('NOW') 
    },
    // Who assigned the task to the user
    assigned_by: { type: DataTypes.STRING(6) },

    // Date of removing the user from the task
    removed_dt: { type: DataTypes.DATE },
    // Who removed the user from the task
    removed_by: { type: DataTypes.STRING(6) },

  }, {
    sequelize,
    modelName: 'cts_task',
    tableName: 'cts_task',
    timestamps: false,
  });

  return cts_task;
}