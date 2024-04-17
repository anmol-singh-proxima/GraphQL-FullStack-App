/**
 * Filename: ctsTaskMutation.ts
 * Description: 
 * 
 * Create Date: 12 Apr 2024
 */

import { GraphQLList, GraphQLNonNull } from "graphql";
import InsertCtsTaskReturnType from '../types/response/InsertCtsTaskReturnType';
import UpdateCtsTaskReturnType from '../types/response/UpdateCtsTaskReturnType';
import InsertCtsTaskInputType from "../types/input/InsertCtsTaskInputType";
import UpdateCtsTaskInputType from "../types/input/UpdateCtsTaskInputType";
import insertCtsTask from '../resolvers/insertCtsTask';
import updateCtsTask from '../resolvers/updateCtsTask';

async function ctsTaskMutation() { return {
    insertTask: {
        type: new GraphQLNonNull(new GraphQLList(InsertCtsTaskReturnType)),
        args: {
            input: {
                name: 'input',
                description: 'insert a new user',
                type: new GraphQLNonNull(new GraphQLList(InsertCtsTaskInputType))
            }
        },
        resolve: insertCtsTask
    },
    updateTask: {
        type: new GraphQLNonNull(UpdateCtsTaskReturnType),
        args: {
            input: {
                name: 'input',
                description: 'update an existing user',
                type: new GraphQLNonNull(UpdateCtsTaskInputType)
            }
        },
        resolve: updateCtsTask
    },
}}

export { ctsTaskMutation };