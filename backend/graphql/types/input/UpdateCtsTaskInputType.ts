/**
 * Filename: UpdateCtsTaskInputType.ts
 * Description: 
 * 
 * Create Date: 12 Apr 2024
 */

const { attributeFields } = require('graphql-sequelize');
import { GraphQLInputObjectType } from 'graphql';
import db from '../../../models';

const UpdateCtsTaskInputType = new GraphQLInputObjectType({
    name: "UpdateCtsTaskInputType",
    description: "Payload to Update an existing User in Database",
    fields: () => {
        return {
            ...attributeFields(db.cts_task, {
                exclude: ['created_dt', 'created_by', 'deleted_dt', 'deleted_by'],
                allowNull: true,
            })
        }
    },
});

export default UpdateCtsTaskInputType;