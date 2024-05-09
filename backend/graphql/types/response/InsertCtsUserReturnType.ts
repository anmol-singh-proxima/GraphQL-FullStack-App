/**
 * Filename: InsertCtsUserReturnType.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

const { attributeFields } = require('graphql-sequelize');
import { GraphQLObjectType } from "graphql";
import db from '../../../models';

const InsertCtsUserReturnType = new GraphQLObjectType({
    name: 'InsertCtsUserReturnType',
    fields: () => {
        return {
            ...attributeFields(db.cts_user, {
                exclude: ['password', 'created_dt', 'created_by', 'deleted_dt', 'deleted_by'],
                allowNull: true,
            })
        }
    },
});

export default InsertCtsUserReturnType;