/**
 * Filename: graphql/queries/cts_user.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

'use strict';

import CtsUser from '../types/entity/CtsUser';
import db from '../../models';
const { resolver, defaultListArgs } = require('graphql-sequelize');
import { GraphQLList } from 'graphql';

async function ctsUser() {
    return {
        cts_user: {
            type: new GraphQLList(CtsUser),
            args: defaultListArgs(db.cts_user),
            resolve: resolver(db.cts_user, {
                before: (findOptions: any, args: any, context: any) => {
                    // console.log("find in cts_user:", findOptions);
                    // console.log("args in cts_user:", args);
                    // console.log("context in cts_user:", context);
                    if(args.where) {
                        // console.log("where:", args.where);
                        // const role_id = args.where.role_id ? args.where.role_id : null;
                        // const first_name = args.where.first_name ? args.where.first_name : null;
                        // let whereObj = {};
                        // if(role_id) { 
                        //     whereObj = Object.assign(whereObj, { "role_id": role_id }) 
                        // }
                        // if(first_name) { 
                        //     whereObj = Object.assign(whereObj, { "first_name": first_name }) 
                        // }
                        // console.log("whereobj:", whereObj);
                        // findOptions.where = whereObj;
                        findOptions.where = args.where;
                    }
                    findOptions.order = [['user_id', 'ASC']];
                    return findOptions;
                },
            })
        }
    }
}

ctsUser().then(data => {
    console.log("Data:", data.cts_user.resolve);
})

export { ctsUser };