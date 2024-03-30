import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

const InsertCtsUser = new GraphQLInputObjectType({
    name: "InsertCtsUser",
    description: "Payload to creating a new user",
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