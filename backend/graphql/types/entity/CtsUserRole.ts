/**
 * Filename: CtsUserRole.ts
 * Description: 
 * 
 * Create Date: 05 Apr 2024
 */

import { GraphQLObjectType } from 'graphql';
const { attributeFields, resolver, defaultListArgs } = require('graphql-sequelize');
import db from '../../../models';
import CtsUserType from './CtsUserType';

const CtsUserRole: GraphQLObjectType = new GraphQLObjectType({
    name: 'CtsUserRole',
    fields: () => {
        return {
            ...attributeFields(db.cts_user_role, { allowNull: true }),
            user_type: {
                type: CtsUserType,
                args: defaultListArgs(db.cts_user_role.CtsUserType),
                resolve: resolver(db.cts_user_role.CtsUserType),
            }
        }
    }
});

export default CtsUserRole;