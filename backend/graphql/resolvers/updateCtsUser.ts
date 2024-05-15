/**
 * Filename: updateCtsUser.ts
 * Description: 
 * 
 * Create Date: 01 Apr 2024
 */

import db from '../../models';

const updateCtsUser = async (root: any, { input }: any, context: any, info: any) => {
    console.log("Executing 'updateCtsUser' resolver...");
    console.log("input:", input);
    const transaction: any = await db.sequelize.transaction();
    let user: any = {};

    // Finding if the User exists or not
    try {
        const query = "SELECT * FROM cts_user WHERE user_id = :userId AND email = :emailId;";
        const instance = await db.sequelize.query(query, {
            replacements: {
                userId: input.user_id,
                emailId: input.email,
            },
            type: db.sequelize.QueryTypes.SELECT
        });

        if (!instance) {
            throw new Error("[updateCtsUser]: Select instance failed");
        }
        if (instance.length == 0) {
            throw new Error(`[updateCtsUser]: EmailId / UserId Not Found`);
        }
        if (instance.length != 1) {
            throw new Error(`[updateCtsUser]: Expected 1 user, found ${instance.length}`);
        }
    } catch (err) {
        transaction ? await transaction.rollback() : true;
        console.error('[updateCtsUser]:', err);
        return err;
    }

    // Updating the User if it exists
    try {
        // Setting the fields to be updated
        const modelAttributes = db.cts_user.rawAttributes;
        const excludedFields: string[] = ['user_id', 'email'];

        let fields = Object.keys(modelAttributes);
        fields = fields.filter((field) => {
            return !excludedFields.includes(field)
        });

        // Setting the Options to pass to the Query
        const updateOptions = {
            transaction: transaction,
            where: {
                email: input.email,
                user_id: input.user_id,
            },
            fields: fields,
            returning: true,
        }

        // Setting the required Update Data
        let updateData = fields.reduce((accumulator, field) => {
            return { ...accumulator, [field]: '' };
        }, {});
        updateData = Object.assign(updateData, input);

        // Running the Update Query
        const instance = await db.cts_user.update(updateData, updateOptions);
        if (!instance) {
            throw new Error("[updateCtsUser]: Sequelize update instance failed");
        }
        if (instance[0] == 0) {
            throw new Error(`[updateCtsUser]: Could not update the User data`);
        }
        if (instance[1].length > 1) {
            throw new Error(`[updateCtsUser]: Expected 1 user, found ${instance[1].length}.`)
        }
        user = instance[1][0].dataValues;
    } catch (err) {
        transaction ? await transaction.rollback() : true;
        console.error('[updateCtsUser]:', err);
        return err;
    }

    try {
        transaction ? await transaction.commit() : true;
    } catch (err) {
        transaction ? await transaction.rollback() : true;
        console.error('[updateCtsUser]:', err);
        return err;
    }

    return user;
}

export default updateCtsUser;