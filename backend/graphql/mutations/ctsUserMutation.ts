/**
 * Filename: ctsUserMutation.ts
 * Description: 
 * 
 * Create Date: 03 Apr 2024
 */

import { GraphQLNonNull } from "graphql";
import InsertCtsUserReturnType from '../types/response/InsertCtsUserReturnType';
import UpdateCtsUserReturnType from "../types/response/UpdateCtsUserReturnType";
import LoginCtsUserReturnType from "../types/response/LoginCtsUserReturnType";
import InsertCtsUserInputType from "../types/input/InsertCtsUserInputType";
import UpdateCtsUserInputType from "../types/input/UpdateCtsUserInputType";
import LoginCtsUserInputType from "../types/input/LoginCtsUserInputType";
import insertCtsUser from '../resolvers/insertCtsUser';
import updateCtsUser from "../resolvers/updateCtsUser";
import loginCtsUser from "../resolvers/loginCtsUser";

async function ctsUserMutation() {
    return {
        insertUser: {
            type: InsertCtsUserReturnType,
            args: {
                input: {
                    name: 'input',
                    description: 'insert a new user',
                    type: new GraphQLNonNull(InsertCtsUserInputType)
                }
            },
            resolve: insertCtsUser
        },
        updateUser: {
            type: UpdateCtsUserReturnType,
            args: {
                input: {
                    name: 'input',
                    description: 'insert a new user',
                    type: new GraphQLNonNull(UpdateCtsUserInputType)
                }
            },
            resolve: updateCtsUser
        },
        loginUser: {
            type: LoginCtsUserReturnType,
            args: {
                input: {
                    name: 'input',
                    description: 'login a user',
                    type: new GraphQLNonNull(LoginCtsUserInputType)
                }
            },
            resolve: loginCtsUser
        },
    }
}

export { ctsUserMutation };