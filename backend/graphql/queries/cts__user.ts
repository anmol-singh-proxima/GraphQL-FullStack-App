/**
 * Filename: cts__user.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

'use strict';

import CtsUser from '../types/entity/CtsUser';
import db from '../../models';
const { resolver, defaultListArgs, attributeFields } = require('graphql-sequelize');
import { GraphQLList } from 'graphql';

async function ctsUser() {
    // console.log("User Fields in queries:", CtsUser.getFields());
    return {
        cts_user: {
            type: new GraphQLList(CtsUser),
            args: defaultListArgs(db.cts_user),
            resolve: resolver(db.cts_user)
        }
    }
}

export { ctsUser };