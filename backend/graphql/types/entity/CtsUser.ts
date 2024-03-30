const _ = require('lodash');
import { GraphQLObjectType } from 'graphql';
const { attributeFields, resolver, defaultListArgs } = require('graphql-sequelize');
import db from '../../../models';
import CtsUserType from './CtsUserType';

const CtsUser = new GraphQLObjectType({
    name: 'CtsUser',
    fields: _.assign(attributeFields(db.cts_user), {
        user_type: {
            type: CtsUserType,
            args: defaultListArgs(db.cts_user.CTSUserType),
            resolve: resolver(db.cts_user.CTSUserType),
        }
    })
})

export default CtsUser;