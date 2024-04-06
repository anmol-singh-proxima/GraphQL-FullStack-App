/**
 * Filename: graphql/queries/cts_user_type.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

'use strict';

import CtsUserType from '../types/entity/CtsUserType';
import db from '../../models';
const { resolver, defaultListArgs } = require('graphql-sequelize');
import { GraphQLList } from 'graphql';

async function ctsUserType() {
    return {
        cts_user_type: {
            type: new GraphQLList(CtsUserType),
            args: defaultListArgs(db.cts_user_type),
            resolve: resolver(db.cts_user_type)
        }
    }
}

export { ctsUserType };