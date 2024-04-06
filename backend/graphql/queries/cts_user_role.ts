/**
 * Filename: graphql/queries/cts_user_role.ts
 * Description: 
 * 
 * Create Date: 05 Apr 2024
 */

'use strict';

import CtsUserRole from '../types/entity/CtsUserRole';
import db from '../../models';
const { resolver, defaultListArgs } = require('graphql-sequelize');
import { GraphQLList } from 'graphql';

async function ctsUserRole() {
    return {
        cts_user_role: {
            type: new GraphQLList(CtsUserRole),
            args: defaultListArgs(db.cts_user_role),
            resolve: resolver(db.cts_user_role)
        }
    }
}

export { ctsUserRole };