/**
 * Filename: UpdateCtsUserInputType.ts
 * Description: 
 * 
 * Create Date: 01 Apr 2024
 */

const { attributeFields } = require('graphql-sequelize');
import { GraphQLInputObjectType } from 'graphql';
import db from '../../../models';

const UpdateCtsUserInputType = new GraphQLInputObjectType({
    name: "UpdateCtsUserInputType",
    description: "Payload to Update an existing User in Database",
    fields: () => {
        return {
            ...attributeFields(db.cts_user, {
                exclude: ['created_dt', 'created_by', 'deleted_dt', 'deleted_by'],
                allowNull: true,
            })
        }
    },
});

export default UpdateCtsUserInputType;