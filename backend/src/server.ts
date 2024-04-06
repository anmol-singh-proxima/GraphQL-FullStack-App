/**
 * Filename: server.ts
 * Description: Main Server File
 * 
 * Create Date: 29 Mar 2024
 */

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { printSchema } from 'graphql';
import { buildSchema } from '../graphql/schema';
import db from '../models';

/**
 * Uncomment the following code to add data to the tables in the database
 * Should be executed only once
 */
// import { createUsers, createUserRoles, createUserTypes } from './utils';
// createUsers();
// createUserRoles();
// createUserTypes();

// Function to start the Server
const startServer = async () => {
    const schema = await buildSchema();
    // console.log("Schema:", printSchema(schema));
    const server = new ApolloServer(Object.assign({
        schema,
    }));
    // db.sequelize.sync().then(async () => {
        const { url } = await startStandaloneServer(server, {
            listen: { port: 4000 },
        });
        console.log(`🚀  Server ready at: ${url}`);
    // })
}

startServer();