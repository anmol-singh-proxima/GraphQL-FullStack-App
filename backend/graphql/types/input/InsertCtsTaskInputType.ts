/**
 * Filename: InsertCtsTaskInputType.ts
 * Description: 
 * 
 * Create Date: 12 Apr 2024
 */

const { attributeFields } = require('graphql-sequelize');
import { GraphQLInputObjectType } from 'graphql';
import db from '../../../models';

const InsertCtsTaskInputType = new GraphQLInputObjectType({
    name: "InsertCtsTaskInputType",
    description: "Payload to Create a new Task in Database",
    fields: () => {
        return {
            ...attributeFields(db.cts_task, {
                exclude: ['removed_dt', 'removed_by', 'deleted_dt', 'deleted_by'],
                allowNull: true,
            })
        }
    },
});

export default InsertCtsTaskInputType;