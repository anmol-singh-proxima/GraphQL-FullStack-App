/**
 * Filename: server.ts
 * Description: Main Server File
 * 
 * Create Date: 29 Mar 2024
 */

import { ApolloServer } from '@apollo/server';
// import { ApolloServer } from 'apollo-server-express';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError, printSchema } from 'graphql';
const express = require('express');
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import db from './models';
import getUserByToken from './utils/getUserByToken';
import { buildSchema } from './graphql/schema';
import loginUser from './utils/loginUser';
import checkIfUserLoggedIn from './utils/checkIfUserLoggedIn';


/**
 * Uncomment the following code to add data to the tables in the database
 * Should be executed only once
 * **** CAUTION ****
 */
// import { createAssignments, createProjects, createTasks, createUsers, createUserRoles, createUserTypes } from './utils/createTablesData';
// createUserTypes();
// createUserRoles();
// createUsers();
// createProjects();
// createAssignments();
// createTasks();


const PORT = 4000;
const app = express();

// Function to start the Server
const startExpressServer = async () => {
    app.use(cors());
    app.use(express.json());
    const schema = await buildSchema();
    // console.log('Schema:', printSchema(schema));

    let user: null | undefined | Object = null;
    let loggedIn = false;

    const server = new ApolloServer({
        schema,
    });
    await server.start();

    app.post('/login', loginUser);

    app.use('/', async (req: any, res: any, next: any) => {
        user = await checkIfUserLoggedIn(req, res);
        if (user) {
            console.log('[app.use(/)] User logged in successfully');
            loggedIn = true;
            process.env.uid = user.user_id ? user.user_id : null;
            process.env.isAdmin = user.role && user.role === 'ADMN' ? 'true' : 'false';
            process.env.isLead = user.role && user.role === 'LEAD' ? 'true' : 'false';
            process.env.isStrd = user.role && user.role === 'STRD' ? 'true' : 'false';
            next();
        } else {
            console.log('[app.use(/)] User Not Authorized!');
            return;
        }
    });

    app.use(
        '/graphql',
        cors(),
        express.json(),
        expressMiddleware(server, {
            context: async () => {
                // console.log('[startExpressServer] Request.headers:', req.headers);
                // const authorization = req.headers.authorization || '';
                // let token = '';
                // let user = null;
                // if (authorization) {
                //     token = authorization.split(' ')[1];
                //     console.log('[startExpressServer] Token:', token);
                //     getUserByToken(token).then((response) => {
                //         console.log('[startExpressServer] Promise Response:', response);
                //         user = response;
                //     }).catch(err => {
                //         console.log('[startExpressServer] Error in Verifying Token:', err);
                //     });
                // }
                // const loggedIn = user ? true : false;
                // console.log('[startExpressServer] User: ', user);
                // console.log('[startExpressServer] loggedIn: ', loggedIn);
                return { loggedIn, user };
            },
        }),
    );

    // start the Express server
    // db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
    // }).catch((error: any) => {
    //     console.log('[app.ts] Error in Database Connection:', error);
    // });
}

/* Start the Express Server */
startExpressServer();








// async function startApolloServer() {
//     const app = express();
//     const schema = await buildSchema();
//     // const server = new ApolloServer(Object.assign({ schema }));
//     const server = new ApolloServer({
//         schema,
//         context: async ({ req, res }) => {
//             console.log('[startApolloServer] Request.headers:', req.headers);
//             const authorization = req.headers.authorization || '';
//             let token = '';
//             let user = null;
//             let data = {};
//             if (authorization) {
//                 token = authorization.split(' ')[1];
//                 console.log('[startApolloServer] Token:', token);
//                 getUserByToken(token).then((response) => {
//                     console.log('[startApolloServer] Promise Response:', response);
//                     user = response;
//                 }).catch(err => {
//                     console.log('[startApolloServer] Error in Verifying Token:', err);
//                 });
//             }
//             const loggedIn = user ? true : false;
//             console.log('[startApolloServer] User: ', user);
//             console.log('[startApolloServer] loggedIn: ', loggedIn);
//             return { loggedIn, user };
//         },
//     });
//     await server.start();

//     app.use('/', async (req: any, res: any) => {
//         console.log('[checkIfUserLoggedIn] Request.headers:', req.headers);
//         console.log('[checkIfUserLoggedIn] Request.headers:', req.headers['access-control-request-headers']);
//         console.log('[checkIfUserLoggedIn] Request.headers:', req.headers['access-control-request-headers'].authorization);
//         const authorization = req.headers.authorization;
//         let token = null;
//         let user = null;
//         if (authorization) {
//             token = authorization.split(' ')[1];
//             console.log('[checkIfUserLoggedIn] Token:', token);
//             getUserByToken(token).then((response) => {
//                 console.log('[checkIfUserLoggedIn] Promise Response:', response);
//                 user = response;
//                 if (!user) {
//                     res.status(401).send('User Not Authorized');
//                 }
//             }).catch(err => {
//                 console.log('[checkIfUserLoggedIn] Error in Verifying Token:', err);
//             });
//         } else {
//             console.log('[checkIfUserLoggedIn] User Not Authorized');
//             // res.status(401).send('User Not Authorized');
//             res.send({
//                 status: 401,
//                 code: 'UNAUTHENTICATED',
//                 message: 'User Not Authorized',
//             });
//             // await res.json(new GraphQLError('User is not authenticated', {
//             //         extensions: {
//             //         code: 'UNAUTHENTICATED',
//             //         http: { status: 401 },
//             //         },
//             //     }));
//             res.end();
//             // throw new GraphQLError('User is not authenticated', {
//             //     extensions: {
//             //     code: 'UNAUTHENTICATED',
//             //     http: { status: 401 },
//             //     },
//             // });

//             console.log('[checkIfUserLoggedIn] After res.send()');
//             return;
//         }
//     });

//     server.applyMiddleware({ app });
//     await new Promise(resolve => app.listen({ port: 4000 }, resolve));
//     console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
//     return { server, app };
// }

// startApolloServer().then(response => {
//     // console.log('[app.js] response:', response);
// }).catch(err => {
//     console.log('[app.js] err:', err);
// });








// const httpServer = http.createServer(app);

// const startApolloServer = async () => {
//     const schema = await buildSchema();
//     // const server = new ApolloServer(Object.assign({ schema }));
//     const server = new ApolloServer({
//         schema,
//         plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//      });
//     await server.start();

//     // app.use('/graphql', (req: any, res: any) => {
//     //     console.log('[checkIfUserLoggedIn] Request.headers:', req.headers);
//     //     const authorization = req.headers.authorization;
//     //     let token = null;
//     //     let user = null;
//     //     if (authorization) {
//     //         token = authorization.split(' ')[1];
//     //         console.log('[checkIfUserLoggedIn] Token:', token);
//     //         getUserByToken(token).then((response) => {
//     //             console.log('[checkIfUserLoggedIn] Promise Response:', response);
//     //             user = response;
//     //             if (!user) {
//     //                 res.status(500).send('User Not Authorized');
//     //             }
//     //         }).catch(err => {
//     //             console.log('[checkIfUserLoggedIn] Error in Verifying Token:', err);
//     //         });
//     //     } else {
//     //         console.log('[checkIfUserLoggedIn] User Not Authorized');
//     //         res.status(500).send('User Not Authorized');
//     //     }
//     // });

//     // Here you set up Express middleware
//     app.use(
//         '/graphql',
//         cors(),
//         express.json(),
//         bodyParser.json({ limit: '50mb' }),
//         // You can add your custom middleware here
//         expressMiddleware(server, {
//             // You can also process the req and res objects and pass data to your resolvers
//             context: async ({ req, res }) => {
//                 console.log('[startApolloServer] Request.headers:', req.headers);
//                 const authorization = req.headers.authorization || '';
//                 let token = '';
//                 let user = null;
//                 if (authorization) {
//                     token = authorization.split(' ')[1];
//                     console.log('[startApolloServer] Token:', token);
//                     getUserByToken(token).then((response) => {
//                         console.log('[startApolloServer] Promise Response:', response);
//                         user = response;
//                     }).catch(err => {
//                         console.log('[startApolloServer] Error in Verifying Token:', err);
//                     });
//                 }
//                 const loggedIn = user ? true : false;
//                 console.log('[startApolloServer] User: ', user);
//                 console.log('[startApolloServer] loggedIn: ', loggedIn);
//                 return { loggedIn, user };
//             },
//         }),
//     );

//     // db.sequelize.sync().then(async () => {
//         await new Promise((resolve: any) => httpServer.listen({ port: 4000 }, resolve));
//         console.log(`🚀 Server ready at http://localhost:4000/`);
//     // })
//     return { server, app };
// }

// startApolloServer();







// const checkIfUserLoggedIn = (req: any, res: any) => {
//     console.log('[checkIfUserLoggedIn] Request.headers:', req.headers);
//     const authorization = req.headers.authorization || '';
//     let token = null;
//     let user = null;
//     if (authorization) {
//         token = authorization.split(' ')[1];
//         console.log('[checkIfUserLoggedIn] Token:', token);
//         getUserByToken(token).then((response) => {
//             console.log('[checkIfUserLoggedIn] Promise Response:', response);
//             user = response;
//             if(!user) {
//                 res.send(401).json('User Not Authorized');
//             }
//         }).catch(err => {
//             console.log('[checkIfUserLoggedIn] Error in Verifying Token:', err);
//         });
//     }
// const loggedIn = user ? true : false;
// console.log('[checkIfUserLoggedIn] User: ', user);
// console.log('[checkIfUserLoggedIn] loggedIn: ', loggedIn);
// return { loggedIn, user };
// }




// const startServer = async () => {
//     const schema = await buildSchema();
//     // console.log('Schema:', printSchema(schema));
//     const server = new ApolloServer(Object.assign({ schema }));
//     // db.sequelize.sync().then(async () => {
//         const { url } = await startStandaloneServer(server, {
//             listen: { port: 4000 },
//             context: async ({ req, res }) => {
//                 console.log('[startStandaloneServer] Request.headers:', req.headers);
//                 const authorization = req.headers.authorization || '';
//                 let token = '';
//                 let user = null;
//                 let data = {};
//                 if(authorization) {
//                     token = authorization.split(' ')[1];
//                     console.log('[startStandaloneServer] Token:', token);
//                     getUserByToken(token).then((response) => {
//                         console.log('[startStandaloneServer] Promise Response:', response);
//                         user = response;
//                     }).catch(err => {
//                         console.log('[startStandaloneServer] Error in Verifying Token:', err);
//                     });
//                 }
//                 const loggedIn = user ? true: false;
//                 console.log('[startStandaloneServer] User: ', user);
//                 console.log('[startStandaloneServer] loggedIn: ', loggedIn);
//                 return { loggedIn, user };
//             },
//         });
//         console.log(`🚀  Server ready at: ${url}`);
//     // })
// }

// startServer();