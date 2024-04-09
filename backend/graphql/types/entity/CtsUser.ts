/**
 * Filename: CtsUser.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

const _ = require('lodash');
import { GraphQLObjectType, GraphQLList } from 'graphql';
const { attributeFields, resolver, defaultListArgs } = require('graphql-sequelize');
import db from '../../../models';

const CtsUser: GraphQLObjectType = new GraphQLObjectType({
    name: 'CtsUser',
    fields: () => {
        const CtsUserRole = require('./CtsUserRole').default;
        const CtsProject = require('./CtsProject').default;
        const CtsTask = require('./CtsTask').default;

        return {
            ...attributeFields(db.cts_user, {
                exclude: ['password'],
                allowNull: true,
            }),
            user_role: {
                type: CtsUserRole,
                args: defaultListArgs(db.cts_user.CtsUserRole),
                resolve: resolver(db.cts_user.CtsUserRole),
            },
            cts_projects: {
                type: new GraphQLList(CtsProject),
                args: defaultListArgs(db.cts_user.CtsProjects),
                resolve: resolver(db.cts_user.CtsProjects),
            },
            cts_tasks: {
                type: new GraphQLList(CtsTask),
                args: defaultListArgs(db.cts_user.CtsTasks),
                resolve: resolver(db.cts_user.CtsTasks),
            }
        }
    },
})

export default CtsUser;