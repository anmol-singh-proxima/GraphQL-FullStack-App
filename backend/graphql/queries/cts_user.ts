/**
 * Filename: graphql/queries/cts_user.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

const { resolver, defaultListArgs } = require('graphql-sequelize');
import { GraphQLList } from 'graphql';
import db from '../../models';
import CtsUser from '../types/entity/CtsUser';

async function ctsUser() {
    return {
        cts_user: {
            type: new GraphQLList(CtsUser),
            args: defaultListArgs(db.cts_user),
            resolve: resolver(db.cts_user, {
                before: (findOptions: any, args: any, context: any) => {
                    if(args.where) {
                        findOptions.where = args.where;
                    }
                    findOptions.order = [['user_id', 'ASC']];
                    return findOptions;
                },
            })
        }
    }
}

export { ctsUser };