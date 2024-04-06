/**
 * Filename: CtsUser.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

const _ = require('lodash');
import { GraphQLObjectType } from 'graphql';
const { attributeFields, resolver, defaultListArgs } = require('graphql-sequelize');
import db from '../../../models';
import CtsUserRole from './CtsUserRole';

console.log("CtsUser:");

const CtsUser = new GraphQLObjectType({
    name: 'CtsUser',
    fields: _.assign(attributeFields(db.cts_user), {
        user_role: {
            type: CtsUserRole,
            args: defaultListArgs(db.cts_user.CtsUserRole),
            resolve: resolver(db.cts_user.CtsUserRole),
        }
    })
})

export default CtsUser;