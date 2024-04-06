/**
 * Filename: UpdateCtsUserInputType.ts
 * Description: 
 * 
 * Create Date: 01 Apr 2024
 */

import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

const UpdateCtsUserInputType = new GraphQLInputObjectType({
    name: "UpdateCtsUserInputType",
    description: "Payload to Update an existing User in Database",
    fields: {
        user_id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        type_id: { type: GraphQLString },
    }
});

export default UpdateCtsUserInputType;