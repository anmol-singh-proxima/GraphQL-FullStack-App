/**
 * Filename: LoggedInCtsUserInputType.ts
 * Description: 
 * 
 * Create Date: 11 Apr 2024
 */

import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

const LoggedInCtsUserInputType = new GraphQLInputObjectType({
    name: "LoggedInCtsUserInputType",
    description: "Payload to login an existing User in the App",
    fields: {
        token: { type: new GraphQLNonNull(GraphQLString) },
    }
});

export default LoggedInCtsUserInputType;