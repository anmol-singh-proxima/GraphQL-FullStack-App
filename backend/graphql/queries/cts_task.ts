/**
 * Filename: graphql/queries/cts_task.ts
 * Description: 
 * 
 * Create Date: 07 Apr 2024
 */

const { resolver, defaultListArgs } = require('graphql-sequelize');
import { GraphQLList } from 'graphql';
import db from '../../models';
import CtsTask from '../types/entity/CtsTask';

async function ctsTask() {
    return {
        cts_task: {
            type: new GraphQLList(CtsTask),
            args: defaultListArgs(db.cts_task),
            resolve: resolver(db.cts_task, {
                before: (findOptions: any, args: any, context: any) => {
                    console.log('[cts_task.ts] findOptions:', findOptions);
                    console.log('[cts_task.ts] context:', context);
                    console.log('[cts_task.ts] args:', args);
                    if (context.loggedIn === true && context.user) {
                        if (args.where) {
                            findOptions.where = args.where;
                        }
                        findOptions.order = [['task_id', 'ASC']];
                        return findOptions;
                    }
                    return null;
                },
            })
        }
    }
}

export { ctsTask };