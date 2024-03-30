const _ = require('lodash');
import { GraphQLObjectType } from 'graphql';
const { attributeFields } = require('graphql-sequelize');
import db from '../../../models';

const CtsUserType = new GraphQLObjectType({
    name: 'CtsUserType',
    fields: _.assign(attributeFields(db.cts_user_type))
});

export default CtsUserType;