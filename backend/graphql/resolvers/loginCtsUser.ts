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
            throw new Error("[loginCtsUser]: select instance failed");
        }
        if(instance.length == 0) {
            throw new Error(`[loginCtsUser]: EmailId / UserId Not Found`);
        }
        if(instance.length != 1) {
            throw new Error(`[updateCtsUser]: Expected 1 user, found ${instance.length}.`);
        }

        // console.log("[loginCtsUser]: instance:", instance);
        // console.log("[loginCtsUser]: instance.dataValues:", instance[0].dataValues);
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
        console.error('[loginCtsUser]:', err);
        return err;
    }

    return { user, token };
}

export default loginCtsUser;