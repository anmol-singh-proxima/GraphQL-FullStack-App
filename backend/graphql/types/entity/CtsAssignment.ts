/**
 * Filename: CtsAssignment.ts
 * Description: 
 * 
 * Create Date: 07 Apr 2024
 */

const _ = require('lodash');
import { GraphQLObjectType } from 'graphql';
const { attributeFields } = require('graphql-sequelize');
import db from '../../../models';

const CtsAssignment: GraphQLObjectType = new GraphQLObjectType({
    name: 'CtsAssignment',
    fields: _.assign(attributeFields(db.cts_assignment))
});

export default CtsAssignment;