'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
let db: any = {};
require('dotenv').config();

import cts_user from './cts__user';
import cts_user_type from './cts__user_type';

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