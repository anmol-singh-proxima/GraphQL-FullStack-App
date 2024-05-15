/**
 * Filename: insertCtsUser.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

import { Op } from "sequelize";
import db from '../../models';

const insertCtsUser = async (root: any, { input }: any, context: any, info: any) => {
    console.log("Executing 'insertCtsUser' resolver...");
    console.log("input:", input);
    const transaction: any = await db.sequelize.transaction();
    let user: any = {};

    // Finding if User already exists or not
    try {
        const instance = await db.cts_user.findAll({
            where: {
                [Op.or]: [
                    { user_id: input.user_id },
                    { email: input.email }
                ]
            }
        }, { transaction: transaction });

        if (!instance) {
            throw new Error("[insertCtsUser]: Sequelize findAll instance failed");
        }
        if (instance.length > 0) {
            throw new Error(`[insertCtsUser]: User ${input.user_id} already exists`);
        }

    } catch (err) {
        transaction ? await transaction.rollback() : true;
        console.error('[insertCtsUser]:', err);
        return err;
    }

    // Adding User if it doesn't exist
    try {
        // Setting the fields to be updated
        const modelAttributes = db.cts_user.rawAttributes;
        const excludedFields: string[] = [];

        let fields = Object.keys(modelAttributes);
        fields = fields.filter((field) => {
            return !excludedFields.includes(field)
        });

        // Setting the Options to pass to the Query
        const createOptions = {
            transaction: transaction,
            returning: true,
            fields: fields,
        }

        // Setting the Data to be added
        let createData = {}
        createData = Object.assign(createData, input);

        // Running the Create Query
        const instance = await db.cts_user.create(createData, createOptions);
        if (!instance) {
            throw new Error("[insertCtsUser]: Sequelize create instance failed");
        }
        user = instance.dataValues;

    } catch (err) {
        transaction ? await transaction.rollback() : true;
        console.error('[insertCtsUser]:', err);
        return err;
    }

    try {
        transaction ? await transaction.commit() : true;
    } catch (err) {
        transaction ? await transaction.rollback() : true;
        console.error('[insertCtsUser]:', err);
        return err;
    }

    return user;
}

export default insertCtsUser;