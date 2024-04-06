/**
 * Filename: UpdateCtsUserReturnType.ts
 * Description: 
 * 
 * Create Date: 01 Apr 2024
 */

import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

const UpdateCtsUserReturnType = new GraphQLObjectType({
    name: 'UpdateCtsUserReturnType',
    fields: {
        user_id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role_id: { type: GraphQLString },
    }
});

export default UpdateCtsUserReturnType;