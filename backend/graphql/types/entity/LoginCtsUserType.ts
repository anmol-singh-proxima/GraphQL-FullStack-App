/**
 * Filename: LoginCtsUserType.ts
 * Description: 
 * 
 * Create Date: 31 Mar 2024
 */

import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

const LoginCtsUserType = new GraphQLObjectType({
    name: 'LoginCtsUserType',
    description: "Payload returned by Server when User login to the App",
    fields: {
        user: { type: new GraphQLObjectType({
            name: 'LoginUser',
            description: "User Data to sent to Client when User login to the App",
            fields: {
                user_id: { type: new GraphQLNonNull(GraphQLString) },
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: new GraphQLNonNull(GraphQLString) },
                type_id: { type: GraphQLString },
                type_name: { type: GraphQLString },
            }
        })},
        token: { type: GraphQLString },
    }
});

export default LoginCtsUserType;