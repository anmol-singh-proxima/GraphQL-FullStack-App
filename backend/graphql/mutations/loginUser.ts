/**
 * Filename: loginUser.ts
 * Description: 
 * 
 * Create Date: 31 Mar 2024
 */

'use strict';

import { GraphQLNonNull } from "graphql";
import LoginCtsUserType from '../types/entity/LoginCtsUserType';
import LoginCtsUser from "../types/input/LoginCtsUser";
import loginCtsUser from '../resolvers/loginCtsUser';

async function loginUser() {
    return {
        loginUser: {
            type: LoginCtsUserType,
            args: {
                input: {
                    name: 'input',
                    description: 'login a user',
                    type: new GraphQLNonNull(LoginCtsUser)
                }
            },
            resolve: loginCtsUser
        }
    }
}

export { loginUser };