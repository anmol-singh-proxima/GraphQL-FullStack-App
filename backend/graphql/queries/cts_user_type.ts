/**
 * Filename: graphql/queries/cts_user_type.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

const { resolver, defaultListArgs } = require('graphql-sequelize');
import { GraphQLList } from 'graphql';
import db from '../../models';
import CtsUserType from '../types/entity/CtsUserType';

async function ctsUserType() {
    return {
        cts_user_type: {
            type: new GraphQLList(CtsUserType),
            args: defaultListArgs(db.cts_user_type),
            resolve: resolver(db.cts_user_type, {
                before: (findOptions: any, args: any, context: any) => {
                    console.log('[cts_user_type.ts] findOptions:', findOptions);
                    console.log('[cts_user_type.ts] context:', context);
                    console.log('[cts_user_type.ts] args:', args);
                    if (context.loggedIn === true && context.user) {
                        if (args.where) {
                            findOptions.where = args.where;
                        }
                        findOptions.order = [['type_id', 'ASC']];
                        return findOptions;
                    }
                    return null;
                },
            })
        }
    }
}

export { ctsUserType };