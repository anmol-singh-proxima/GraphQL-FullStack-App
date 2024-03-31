/**
 * Filename: utils.ts
 * Description: Utility File having utility functions needed in the Server
 * 
 * Create Date: 29 Mar 2024
 */

import db from '../models';
import { users } from '../seeders/users';
import { userTypes } from '../seeders/userTypes';

// Function to add the Data rows in the cts_user table in the Database
export const createUsers = () => {
    users.map(user => {
        db.cts_user.create(user);
    })
}

// Function to add the Data rows in the cts_user_type table in the Database
export const createUserTypes = () => {
    userTypes.map(userType => {
        db.cts_user_type.create(userType);
    })
}