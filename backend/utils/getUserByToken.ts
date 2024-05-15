/**
 * Filename: getUserByToken.ts
 * Description: Utility File to fetch a User from the database using Token given in the Client request headers for the Context in Apollo Standalone Server
 * 
 * Create Date: 11 May 2024
 */

import db from '../models';
import { verifyToken } from '../auth/userToken';

const getUserByToken = async (token: String) => {
    console.log('[getUserByToken] Executing...');

    // First Verify the Token even if its a Valid one or not
    const decoded = verifyToken(token);
    console.log('After verifyToken:', decoded);
    if (!decoded) {
        // throw new Error('User Not Authorized');
        return null;
    }

    // Once the Token gets Verified then get the User associated with the Token
    console.log('[getUserByToken] Token verified successfully');
    const transaction: any = await db.sequelize.transaction();
    const userId = decoded.userId;
    let user: Object;
    let instance;
    try {
        instance = await db.cts_user.findAll({
            where: { user_id: userId }
        }, { transaction: transaction });

        if (!instance) {
            console.log('[getUserByToken] Sequelize findAll instance failed');
            throw new Error('Internal Server Error');
        }
        if (instance.length == 0) {
            console.log('[getUserByToken] UserId Not Found');
            throw new Error('UserId Not Found');
        }
        if (instance.length != 1) {
            console.log(`[getUserByToken] Expected 1 user, found ${instance.length}.`);
            throw new Error(`Expected 1 user, found ${instance.length}.`);
        }

        const userData = instance[0].dataValues;

        instance = await db.cts_user_role.findAll({
            where: { role_id: userData.role_id }
        }, { transaction: transaction });

        if (!instance) {
            console.log('[getUserByToken] Sequelize findAll instance failed');
            throw new Error('Internal Server Error');
        }
        if (instance.length == 0) {
            console.log('[getUserByToken] RoleId Not Found');
            throw new Error('RoleId Not Found');
        }
        if (instance.length != 1) {
            console.log(`[getUserByToken] Expected 1 Role, found ${instance.length}.`);
            throw new Error(`Expected 1 Role, found ${instance.length}.`);
        }

        const userRoleData = instance[0].dataValues;

        user = {
            user_id: userData.user_id,
            email: userData.email,
            first_name: userData.first_name,
            last_name: userData.last_name,
            role_id: userRoleData.role_id,
            role: userRoleData.type_id,
        }
        console.log('[getUserByToken] User:', user);
        transaction ? await transaction.commit() : true;

    } catch (err) {
        transaction ? await transaction.rollback() : true;
        console.error('[getUserByToken]', err);
        return err;
    }
    return user;
}

export default getUserByToken;