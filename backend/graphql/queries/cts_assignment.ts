/**
 * Filename: graphql/queries/cts_assignment.ts
 * Description: 
 * 
 * Create Date: 07 Apr 2024
 */

const { resolver, defaultListArgs } = require('graphql-sequelize');
import { GraphQLList } from 'graphql';
import db from '../../models';
import CtsAssignment from '../types/entity/CtsAssignment';

async function ctsAssignment() {
    return {
        cts_assignment: {
            type: new GraphQLList(CtsAssignment),
            args: defaultListArgs(db.cts_assignment),
            resolve: resolver(db.cts_assignment, {
                before: (findOptions: any, args: any, context: any) => {
                    console.log('[cts_assignment.ts] findOptions:', findOptions);
                    console.log('[cts_assignment.ts] context:', context);
                    console.log('[cts_assignment.ts] args:', args);
                    if (context.loggedIn === true && context.user) {
                        if (args.where) {
                            findOptions.where = args.where;
                        }
                        findOptions.order = [['assignment_id', 'ASC']];
                        return findOptions;
                    }
                    return null;
                },
            })
        }
    }
}

export { ctsAssignment };