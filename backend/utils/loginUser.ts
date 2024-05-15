/**
 * Filename: loginUser.ts
 * Description: 
 * 
 * Create Date: 13 May 2024
 */

import { Op } from 'sequelize';
import db from '../models';
import loginDataValidation from '../dataValidation/loginDataValidation';
import { createToken } from '../auth/userToken';

const loginUser = async (req: any, res: any, next: any) => {
    console.log('[loginUser] Executing...');
    console.log('[loginUser] request.headers:', req.headers);
    console.log('[loginUser] request.body:', req.body);

    const input = req.body;
    console.log('[loginUser] input:', input);

    const { error, value } = loginDataValidation(input);
    console.log(`Response from Login Data Validation\nError: ${error}\nValue:${value}`);

    if (error) {
        console.log('[loginUser] Validation Error: Please check the inputs');
        // throw new Error('Validation Error: Please check the input.');
        res.status(500).send({
            code: 'VALIDATIONERROR',
            message: 'Validation Error: Please check the inputs',
        });
        // res.end();
        // next();
        return;
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

        if (!instance) {
            console.log('[loginUser]: Sequelize findAll instance failed');
            throw new Error('Internal Server Error');
        }
        if (instance.length == 0) {
            console.log('[loginUser]: EmailId / Password Not Found');
            throw new Error('Invalid EmailId / Password');
        }
        if (instance.length != 1) {
            console.log(`[loginUser]: Expected 1 user, found ${instance.length}.`);
            throw new Error(`Expected 1 user, found ${instance.length}.`);
        }

        user = instance[0].dataValues;
        token = createToken({ userId: user.user_id });
        console.log('[loginUser] User:', user);
        console.log('[loginUser] Token:', token);
        console.log('[loginUser] User Logged in Successfully');

        transaction ? await transaction.commit() : true;

        res.status(200).send({
            code: 'AUTHORIZED',
            token,
            user,
        });

    } catch (err) {
        transaction ? await transaction.rollback() : true;
        console.error('[loginUser]:', err);
        res.status(500).send({
            code: 'DATABASEERROR',
            message: 'Database Error',
        });
    }

    return;
}

export default loginUser;