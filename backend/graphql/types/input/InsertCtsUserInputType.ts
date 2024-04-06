/**
 * Filename: InsertCtsUserInputType.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

const _ = require('lodash');
const { attributeFields, resolver, defaultListArgs } = require('graphql-sequelize');
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import db from '../../../models';

const excludedFields: string[] = ['created_dt', 'created_by', 'deleted_dt', 'deleted_by'];
let attributes = _.assign(attributeFields(db.cts_user));
excludedFields.forEach((field) => {
    delete attributes[field];
});

const InsertCtsUserInputType = new GraphQLInputObjectType({
    name: "InsertCtsUserInputType",
    description: "Payload to Create a new User in Database",
    fields: attributes,
    // fields: {
    //     user_id: { type: new GraphQLNonNull(GraphQLString) },
    //     first_name: { type: new GraphQLNonNull(GraphQLString) },
    //     last_name: { type: new GraphQLNonNull(GraphQLString) },
    //     email: { type: new GraphQLNonNull(GraphQLString) },
    //     password: { type: new GraphQLNonNull(GraphQLString) },
    //     type_id: { type: new GraphQLNonNull(GraphQLString) },
    // },
});

export default InsertCtsUserInputType;