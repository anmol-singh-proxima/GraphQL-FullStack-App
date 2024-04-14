/**
 * Filename: loggedInCtsUser.ts
 * Description: 
 * 
 * Create Date: 11 Apr 2024
 */

import db from '../../models';

const loggedInCtsUser = async (root: any, { input }: any, context: any, info: any) => {
    console.log("Executing 'loggedInCtsUser' resolver...");
    console.log("input:", input);
    const transaction: any = await db.sequelize.transaction();
    let user: any = {};
    let tokenIsValid: Boolean = false;

    try {
        const instance = "SELECT * FROM cts_authentication";
        tokenIsValid = true;
    } catch(err) {
        transaction ? await transaction.rollback() : true;
        console.error('[loggedInCtsUser]:', err);
        return err;
    }

    try {
        if(!tokenIsValid) {
            throw new Error("[loggedInCtsUser]: Token is not valid");
        }
        const instance = await db.cts_user.findAll({
            where: { user_id: 'Z01000' }
        }, { transaction: transaction });

        if(!instance) {
            throw new Error("[loggedInCtsUser]: Sequelize findAll instance failed");
        }
        if(instance.length == 0) {
            throw new Error(`[loggedInCtsUser]: UserId Not Found`);
        }
        if(instance.length != 1) {
            throw new Error(`[loggedInCtsUser]: Expected 1 user, found ${instance.length}.`);
        }
        user = instance[0].dataValues;
        console.log('[loggedInCtsUser]: instance:', instance);
        console.log('[loggedInCtsUser]: user:', user);

    } catch(err) {
        transaction ? await transaction.rollback() : true;
        console.error('[loggedInCtsUser]:', err);
        return err;
    }

    try {
        transaction ? await transaction.commit() : true;
    } catch(err) {
        transaction ? await transaction.rollback() : true;
        console.error('[loggedInCtsUser]:', err);
        return err;
    }

    return { ...user };
}

export default loggedInCtsUser;