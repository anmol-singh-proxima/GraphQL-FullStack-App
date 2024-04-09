/**
 * Filename: graphql/queries/cts_project.ts
 * Description: 
 * 
 * Create Date: 07 Apr 2024
 */

const { resolver, defaultListArgs } = require('graphql-sequelize');
import { GraphQLList } from 'graphql';
import db from '../../models';
import CtsProject from '../types/entity/CtsProject';

async function ctsProject() {
    return {
        cts_project: {
            type: new GraphQLList(CtsProject),
            args: defaultListArgs(db.cts_project),
            resolve: resolver(db.cts_project, {
                before: (findOptions: any, args: any, context: any) => {
                    if(args.where) {
                        findOptions.where = args.where;
                    }
                    findOptions.order = [['project_id', 'ASC']];
                    return findOptions;
                },
            })
        }
    }
}

export { ctsProject };