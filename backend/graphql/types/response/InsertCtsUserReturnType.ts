/**
 * Filename: InsertCtsUserReturnType.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

const _ = require('lodash');
const { attributeFields, resolver, defaultListArgs } = require('graphql-sequelize');
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import db from '../../../models';

const InsertCtsUserReturnType = new GraphQLObjectType({
    name: 'InsertCtsUserReturnType',
    // fields: _.assign(attributeFields(db.cts_user), {
    //     exclude: ['created_dt', 'created_by', 'deleted_dt', 'deleted_by']
    // }),
    fields: {
        user_id: { type: new GraphQLNonNull(GraphQLString) },
        first_name: { type: new GraphQLNonNull(GraphQLString) },
        last_name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        role_id: { type: new GraphQLNonNull(GraphQLString) },
    }
});

export default InsertCtsUserReturnType;