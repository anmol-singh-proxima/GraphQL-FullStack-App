/**
 * Filename: LoginCtsUserReturnType.ts
 * Description: 
 * 
 * Create Date: 31 Mar 2024
 */

const { attributeFields } = require('graphql-sequelize');
import { GraphQLObjectType, GraphQLString } from "graphql";
import db from '../../../models';

const LoginCtsUserReturnType = new GraphQLObjectType({
    name: 'LoginCtsUserReturnType',
    description: "Payload returned by Server when User login to the App",
    fields: () => {
        return {
            // user: {
            //     type: new GraphQLObjectType({
            //     name: 'LoginUser',
            //     description: "User Data to sent to Client when User login to the App",
            //     fields: {
            //         ...attributeFields(db.cts_user, {
            //             exclude: ['created_dt', 'created_by', 'deleted_dt', 'deleted_by'],
            //             allowNull: true,
            //         })
            //     }
            // })},
            token: { type: GraphQLString },
        }
    },
});

export default LoginCtsUserReturnType;