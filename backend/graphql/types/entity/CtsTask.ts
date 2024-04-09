/**
 * Filename: CtsTask.ts
 * Description: 
 * 
 * Create Date: 07 Apr 2024
 */

const _ = require('lodash');
import { GraphQLObjectType } from 'graphql';
const { attributeFields } = require('graphql-sequelize');
import db from '../../../models';

const CtsTask: GraphQLObjectType = new GraphQLObjectType({
    name: 'CtsTask',
    fields: _.assign(attributeFields(db.cts_task))
});

export default CtsTask;