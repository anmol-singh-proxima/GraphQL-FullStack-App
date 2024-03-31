/**
 * Filename: loginCtsUser.ts
 * Description: 
 * 
 * Create Date: 31 Mar 2024
 */

import { Op } from 'sequelize';
import db from '../../models';

export default async (root: any, { input }: any, context: any, info: any) => {
    console.log("Executing 'loginCtsUser' resolver...");
    console.log("input:", input);
    const { email, password } = input;
    const transaction: any = await db.sequelize.transaction();
    let userData = [];

    try {
        userData = await db.cts_user.findOne({
            where: { 
                [Op.and]: [
                    { email: email },
                    { password: password },
                ] 
            }
        }, { transaction: transaction });

        if(userData === null) {
            throw new Error("User doesn't exists");
        }

        const token = 'this is the token';
        const user = userData.dataValues;
        const userTypeData = await db.cts_user_type.findOne({
            where: { type_id: user.type_id }
        });

        user.type_name = userTypeData.dataValues.type_name;
        console.log("User Logged in Successfully");
        await transaction.commit();
        return { user, token };
    } catch(err) {
        console.error(err);
        await transaction.rollback();
        return { err };
    }
};