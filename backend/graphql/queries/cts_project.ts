/**
 * Filename: graphql/queries/cts_project.ts
 * Description: 
 * 
 * Create Date: 07 Apr 2024
 */

const { resolver, defaultListArgs } = require('graphql-sequelize');
import { GraphQLError, GraphQLList } from 'graphql';
import db from '../../models';
import CtsProject from '../types/entity/CtsProject';

async function ctsProject() {
    return {
        cts_project: {
            type: new GraphQLList(CtsProject),
            args: defaultListArgs(db.cts_project),
            resolve: resolver(db.cts_project, {
                before: (findOptions: any, args: any, context: any) => {
                    console.log('[cts_project.ts] findOptions:', findOptions);
                    console.log('[cts_project.ts] context:', context);
                    console.log('[cts_project.ts] args:', args);
                    if (context.loggedIn === true && context.user) {
                        if (args.where) {
                            findOptions.where = args.where;
                        }
                        findOptions.order = [['project_id', 'ASC']];
                        return findOptions;
                    } 
                    return null;
                },
            })
        }
    }
}

export { ctsProject };