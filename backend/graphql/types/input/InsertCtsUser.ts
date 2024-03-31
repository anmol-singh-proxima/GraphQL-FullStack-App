/**
 * Filename: InsertCtsUser.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

const InsertCtsUser = new GraphQLInputObjectType({
    name: "InsertCtsUser",
    description: "Payload to Create a new User in Database",
    fields: {
        user_id: { type: new GraphQLNonNull(GraphQLString) },
        first_name: { type: new GraphQLNonNull(GraphQLString) },
        last_name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        type_id: { type: new GraphQLNonNull(GraphQLString) },
    }
});

export default InsertCtsUser;