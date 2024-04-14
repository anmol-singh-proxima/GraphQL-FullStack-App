/**
 * Filename: InsertCtsTaskReturnType.ts
 * Description: 
 * 
 * Create Date: 12 Apr 2024
 */

const { attributeFields } = require('graphql-sequelize');
import { GraphQLObjectType } from "graphql";
import db from '../../../models';

const InsertCtsTaskReturnType = new GraphQLObjectType({
    name: 'InsertCtsTaskReturnType',
    fields: () => {
        return {
            ...attributeFields(db.cts_task, {
                // exclude: ['created_dt', 'created_by', 'deleted_dt', 'deleted_by'],
                allowNull: true,
            })
        }
    },
});

export default InsertCtsTaskReturnType;