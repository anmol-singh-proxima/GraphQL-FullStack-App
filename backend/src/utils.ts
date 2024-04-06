/**
 * Filename: utils.ts
 * Description: Utility File having utility functions needed in the Server
 * 
 * Create Date: 29 Mar 2024
 */

import db from '../models';
import { users } from '../seeders/UserData';
import { userRoles } from '../seeders/UserRoleData';
import { userTypes } from '../seeders/UserTypeData';

// Function to add the Data rows in the cts_user table in the Database
export const createUsers = () => {
    users.map(user => {
        db.cts_user.create(user);
    })
}

// Function to add the Data rows in the cts_user_role table in the Database
export const createUserRoles = () => {
    userRoles.map(userRole => {
        db.cts_user_role.create(userRole);
    })
}

// Function to add the Data rows in the cts_user_type table in the Database
export const createUserTypes = () => {
    userTypes.map(userType => {
        db.cts_user_type.create(userType);
    })
}