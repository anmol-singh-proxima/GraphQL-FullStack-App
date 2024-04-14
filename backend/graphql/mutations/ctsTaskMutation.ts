/**
 * Filename: ctsTaskMutation.ts
 * Description: 
 * 
 * Create Date: 12 Apr 2024
 */

import { GraphQLList, GraphQLNonNull } from "graphql";
import InsertCtsTaskReturnType from '../types/response/InsertCtsTaskReturnType';
import InsertCtsTaskInputType from "../types/input/InsertCtsTaskInputType";
import insertCtsTask from '../resolvers/insertCtsTask';

async function ctsTaskMutation() { return {
    insertTask: {
        type: new GraphQLList(InsertCtsTaskReturnType),
        args: {
            input: {
                name: 'input',
                description: 'insert a new user',
                type: new GraphQLNonNull(new GraphQLList(InsertCtsTaskInputType))
            }
        },
        resolve: insertCtsTask
    },
}}

export { ctsTaskMutation };