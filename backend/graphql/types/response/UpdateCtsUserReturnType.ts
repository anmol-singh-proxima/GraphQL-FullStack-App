/**
 * Filename: UpdateCtsUserReturnType.ts
 * Description: 
 * 
 * Create Date: 01 Apr 2024
 */

const { attributeFields } = require('graphql-sequelize');
import { GraphQLObjectType } from "graphql";
import db from '../../../models';

const UpdateCtsUserReturnType = new GraphQLObjectType({
    name: 'UpdateCtsUserReturnType',
    fields: () => {
        return {
            ...attributeFields(db.cts_user, {
                // exclude: ['created_dt', 'created_by', 'deleted_dt', 'deleted_by'],
                allowNull: true,
            })
        }
    },
});

export default UpdateCtsUserReturnType;