import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

const UpdateCtsUser = new GraphQLInputObjectType({
    name: "UpdateCtsUser",
    description: "Payload to creating a new user",
    fields: {
        user_id: { type: new GraphQLNonNull(GraphQLString) },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        type_id: { type: GraphQLString },
    }
});

export default UpdateCtsUser;