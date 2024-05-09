/**
 * Filename: loginCtsUser.ts
 * Description: 
 * 
 * Create Date: 31 Mar 2024
 */

import { Op } from 'sequelize';
import db from '../../models';
import loginDataValidation from '../../dataValidation/loginDataValidation';
import { createToken } from '../../auth/userToken';

const loginCtsUser = async (root: any, { input }: any, context: any, info: any) => {
    console.log("Executing 'loginCtsUser' resolver...");
    console.log("input:", input);

    const { error, value } = loginDataValidation(input);
    console.log(`Response from Login Data Validation\nError: ${error}\nValue:${value}`);

    if(error) {
        console.log('[loginCtsUser]: Validation Error: Please check the input.');
        throw new Error('Validation Error: Please check the inputs');
    }

    const transaction: any = await db.sequelize.transaction();
    let user = null;
    let token = null;

    try {
        const instance = await db.cts_user.findAll({
            where: {
                [Op.and]: [
                    { email: input.email },
                    { password: input.password },
                ]
            }
        }, { transaction: transaction });

        if(!instance) {
            console.log('[loginCtsUser]: Sequelize findAll instance failed');
            throw new Error('Internal Server Error');
        }
        if(instance.length == 0) {
            console.log('[loginCtsUser]: EmailId / Password Not Found');
            throw new Error('Invalid EmailId / Password');
        }
        if(instance.length != 1) {
            console.log(`[loginCtsUser]: Expected 1 user, found ${instance.length}.`);
            throw new Error(`Expected 1 user, found ${instance.length}.`);
        }

        user = instance[0].dataValues;
        token = createToken({ userId: user.user_id });
        console.log("User:", user);
        console.log("token:", token);
        console.log("[loginCtsUser]: User Logged in Successfully");

    } catch(err) {
        transaction ? await transaction.rollback() : true;
        console.error('[loginCtsUser]:', err);
        return err;
    }

    try {
        transaction ? await transaction.commit() : true;
    } catch(err) {
        transaction ? await transaction.rollback() : true;
        console.error('[loginCtsUser]:', err);
        return err;
    }

    return { user, token };
}

export default loginCtsUser;