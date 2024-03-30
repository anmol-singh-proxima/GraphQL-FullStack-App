'use strict';

import { GraphQLNonNull } from "graphql";
import InsertCtsUserType from '../types/entity/InsertCtsUserType';
import InsertCtsUser from "../types/input/InsertCtsUser";
import insertCtsUser from '../resolvers/insertCtsUser';

async function createUser() {
    return {
        createUser: {
            type: InsertCtsUserType,
            args: {
                input: {
                    name: 'input',
                    description: 'insert a new user',
                    type: new GraphQLNonNull(InsertCtsUser)
                }
            },
            resolve: insertCtsUser
        }
    }
}

export { createUser };