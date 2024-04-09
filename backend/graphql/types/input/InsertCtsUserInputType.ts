/**
 * Filename: InsertCtsUserInputType.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

const { attributeFields } = require('graphql-sequelize');
import { GraphQLInputObjectType } from 'graphql';
import db from '../../../models';

const InsertCtsUserInputType = new GraphQLInputObjectType({
    name: "InsertCtsUserInputType",
    description: "Payload to Create a new User in Database",
    fields: () => {
        return {
            ...attributeFields(db.cts_user, {
                exclude: ['created_dt', 'created_by', 'deleted_dt', 'deleted_by'],
                allowNull: true,
            })
        }
    },
});

export default InsertCtsUserInputType;