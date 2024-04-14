/**
 * Filename: loginCtsUser.ts
 * Description: 
 * 
 * Create Date: 31 Mar 2024
 */

import { Op } from 'sequelize';
import db from '../../models';

const loginCtsUser = async (root: any, { input }: any, context: any, info: any) => {
    console.log("Executing 'loginCtsUser' resolver...");
    console.log("input:", input);
    const transaction: any = await db.sequelize.transaction();
    let user: any = {};
    let token: any = "";

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
            throw new Error("[loginCtsUser]: Sequelize findAll instance failed");
        }
        if(instance.length == 0) {
            throw new Error(`[loginCtsUser]: EmailId / Password Not Found`);
        }
        if(instance.length != 1) {
            throw new Error(`[loginCtsUser]: Expected 1 user, found ${instance.length}.`);
        }

        user = instance[0].dataValues;
        token = 'ThisIsTheToken';
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

    return { token };
}

export default loginCtsUser;