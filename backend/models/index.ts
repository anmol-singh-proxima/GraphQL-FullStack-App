/**
 * Filename: models/index.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
let db: any = {};
require('dotenv').config();

import cts_user from './cts_user';
import cts_user_type from './cts_user_type';
import cts_user_role from './cts_user_role';

let sequelize: any;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db = {
  sequelize,
  Sequelize,
  cts_user: cts_user(sequelize),
  cts_user_type: cts_user_type(sequelize),
  cts_user_role: cts_user_role(sequelize),
}

Object.keys(db).forEach(model => {
  console.log("associate model:", model);
  if (db[model].associate) {
    console.log("association found");
    console.log(`Associating ${model} for ORM`);
    db[model].associate(db);
  }
});

export default db;