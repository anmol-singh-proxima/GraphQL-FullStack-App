/**
 * Filename: CtsUserRole.ts
 * Description: 
 * 
 * Create Date: 05 Apr 2024
 */

const _ = require('lodash');
import { GraphQLObjectType } from 'graphql';
const { attributeFields, resolver, defaultListArgs } = require('graphql-sequelize');
import db from '../../../models';
import CtsUserType from './CtsUserType';

const CtsUserRole = new GraphQLObjectType({
    name: 'CtsUserRole',
    fields: _.assign(attributeFields(db.cts_user_role), {
        user_type: {
            type: CtsUserType,
            args: defaultListArgs(db.cts_user_role.CtsUserType),
            resolve: resolver(db.cts_user_role.CtsUserType),
        }
    })
});

export default CtsUserRole;