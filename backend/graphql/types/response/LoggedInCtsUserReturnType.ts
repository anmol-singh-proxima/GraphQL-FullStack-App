/**
 * Filename: LoggedInCtsUserReturnType.ts
 * Description: 
 * 
 * Create Date: 11 Apr 2024
 */

const { attributeFields } = require('graphql-sequelize');
import { GraphQLObjectType } from "graphql";
import db from '../../../models';

const LoggedInCtsUserReturnType = new GraphQLObjectType({
    name: 'LoggedInCtsUserReturnType',
    fields: () => {
        return {
            ...attributeFields(db.cts_user, {
                exclude: ['deleted_dt', 'deleted_by', 'password'],
                allowNull: true,
            })
        }
    },
});

export default LoggedInCtsUserReturnType;