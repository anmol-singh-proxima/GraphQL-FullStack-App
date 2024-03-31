/**
 * Filename: LoginCtsUser.ts
 * Description: 
 * 
 * Create Date: 31 Mar 2024
 */

import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

const LoginCtsUser = new GraphQLInputObjectType({
    name: "LoginCtsUser",
    description: "Payload to login an existing User in the App",
    fields: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    }
});

export default LoginCtsUser;