/**
 * Filename: LoginCtsUserInputType.ts
 * Description: 
 * 
 * Create Date: 31 Mar 2024
 */

import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

const LoginCtsUserInputType = new GraphQLInputObjectType({
    name: "LoginCtsUserInputType",
    description: "Payload to login an existing User in the App",
    fields: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    }
});

export default LoginCtsUserInputType;