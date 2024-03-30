import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

const InsertCtsUserType = new GraphQLObjectType({
    name: 'InsertCtsUserType',
    fields: {
        user_id: { type: new GraphQLNonNull(GraphQLString) },
        first_name: { type: new GraphQLNonNull(GraphQLString) },
        last_name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        type_id: { type: new GraphQLNonNull(GraphQLString) },
    }
});

export default InsertCtsUserType;