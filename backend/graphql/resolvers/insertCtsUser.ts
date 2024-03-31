/**
 * Filename: insertCtsUser.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

import { Op } from "sequelize";
import db from '../../models';

export default async (root: any, { input }: any, context: any, info: any) => {
    console.log("Executing 'insertCtsUser' resolver...");
    console.log("input:", input);
    const { user_id, first_name, last_name, email, password, type_id } = input;
    const transaction: any = await db.sequelize.transaction();

    try {
        const userData = await db.cts_user.findAll({
            where: {
                [Op.or]: [
                    { user_id: user_id },
                    { email: email }
                ]
            }
        }, { transaction: transaction });

        if(userData.length > 0) {
            throw new Error("User already exists");
        }
    } catch(err) {
        console.error(err);
        throw err;
    }

    try {
        const user = await db.cts_user.create({
            user_id: user_id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            type_id: type_id,
        }, { transaction: transaction });

        console.log("User value: ", user);

        await transaction.commit();
        console.log("User added successfully");
        return {
            data: {
                user_id: user_id
            },
            message: `User ${user_id} added successfully`,
        };
    } catch(err) {
        console.error(err);
        await transaction.rollback();
    }
}