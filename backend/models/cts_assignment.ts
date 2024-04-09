/**
 * Filename: models/cts_assignment.ts
 * Description: 
 * 
 * Create Date: 06 Apr 2024
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export class cts_assignment extends Model {
    public id!: string;
    static associate: any;
}

export default function(sequelize: Sequelize) {
  cts_assignment.init({
    assignment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: { 
      type: DataTypes.STRING(6),
      allowNull: false,
      references: {
        model: 'cts_user',
        key: 'user_id'
      },
      field: 'user_id',
    },
    project_id: { 
      type: DataTypes.STRING(6),
      allowNull: false,
      references: {
        model: 'cts_project',
        key: 'project_id'
      },
      field: 'project_id',
    },
    assigned_dt: { 
      type: DataTypes.DATE, 
      allowNull: false, 
      defaultValue: Sequelize.fn('NOW') 
    },
    assigned_by: { 
      type: DataTypes.STRING(6), 
      allowNull: false 
    },
    removed_dt: { type: DataTypes.DATE },
    removed_by: { type: DataTypes.STRING(6) },
  }, {
    sequelize,
    modelName: 'cts_assignment',
    tableName: 'cts_assignment',
    timestamps: false,
  });

  return cts_assignment;
}