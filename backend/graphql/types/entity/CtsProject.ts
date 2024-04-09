/**
 * Filename: CtsProject.ts
 * Description: 
 * 
 * Create Date: 07 Apr 2024
 */

import { GraphQLObjectType, GraphQLList } from 'graphql';
const { attributeFields, resolver, defaultListArgs } = require('graphql-sequelize');
import db from '../../../models';

const CtsProject: GraphQLObjectType = new GraphQLObjectType({
    name: 'CtsProject',
    fields: () => {
        const CtsUser = require('./CtsUser').default;
        const CtsTask = require('./CtsTask').default;

        return {
            ...attributeFields(db.cts_project, { allowNull: true }),
            cts_users: {
                type: new GraphQLList(CtsUser),
                args: defaultListArgs(db.cts_project.CtsUsers),
                resolve: resolver(db.cts_project.CtsUsers),
            },
            cts_tasks: {
                type: new GraphQLList(CtsTask),
                args: defaultListArgs(db.cts_project.CtsTasks),
                resolve: resolver(db.cts_project.CtsTasks),
            }
        }
    },
});

export default CtsProject;