/**
 * Filename: models/index.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
let db: any = {};
require('dotenv').config();

import cts_assignment from './cts_assignment';
import cts_project from './cts_project';
import cts_task from './cts_task';
import cts_user_role from './cts_user_role';
import cts_user_type from './cts_user_type';
import cts_user from './cts_user';

let sequelize: any;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db = {
  sequelize,
  Sequelize,
  cts_assignment: cts_assignment(sequelize),
  cts_project: cts_project(sequelize),
  cts_task: cts_task(sequelize),
  cts_user_role: cts_user_role(sequelize),
  cts_user_type: cts_user_type(sequelize),
  cts_user: cts_user(sequelize),
}

Object.keys(db).forEach(model => {
  console.log("Model:", model);
  if (db[model].associate) {
    console.log(`Associating ${model} for ORM`);
    db[model].associate(db);
  }
});

export default db;