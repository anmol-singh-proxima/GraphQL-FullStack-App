/**
 * Filename: graphql/queries/cts_user_role.ts
 * Description: 
 * 
 * Create Date: 05 Apr 2024
 */

const { resolver, defaultListArgs } = require('graphql-sequelize');
import { GraphQLList } from 'graphql';
import CtsUserRole from '../types/entity/CtsUserRole';
import db from '../../models';

async function ctsUserRole() {
    return {
        cts_user_role: {
            type: new GraphQLList(CtsUserRole),
            args: defaultListArgs(db.cts_user_role),
            resolve: resolver(db.cts_user_role, {
                before: (findOptions: any, args: any, context: any) => {
                    console.log('[cts_user_role.ts] findOptions:', findOptions);
                    console.log('[cts_user_role.ts] context:', context);
                    console.log('[cts_user_role.ts] args:', args);
                    if (context.loggedIn === true && context.user) {
                        if (args.where) {
                            findOptions.where = args.where;
                        }
                        findOptions.order = [['role_id', 'ASC']];
                        return findOptions;
                    }
                    return null;
                },
            })
        }
    }
}

export { ctsUserRole };