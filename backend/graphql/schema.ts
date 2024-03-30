'use strict';

import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { queries } from './queries';
import { mutations } from './mutations';

export async function buildSchema() {
    console.log("Building schema...");
    return new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: {
                ...await queries()
            }
        }),
        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: {
                ...await mutations()
            }
        })
    })
};