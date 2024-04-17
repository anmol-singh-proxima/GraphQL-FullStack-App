/**
 * Filename: updateCtsTask.ts
 * Description: 
 * 
 * Create Date: 12 Apr 2024
 */

import db from '../../models';
import UpdateCtsTaskInputType from '../types/input/UpdateCtsTaskInputType';

const updateCtsTask = async (root: any, { input }: any, context: any, info: any) => {
    console.log("Executing 'updateCtsTask' resolver...");
    console.log("input:", input);
    const transaction: any = await db.sequelize.transaction();
    let task: any = {};

    // Finding if the Task exists or not
    try {
        const query = "SELECT * FROM cts_task WHERE task_id = :taskId;";
        const instance = await db.sequelize.query(query, {
            replacements: {
                taskId: input.task_id,
            },
            type: db.sequelize.QueryTypes.SELECT
        });

        if(!instance) {
            throw new Error("[updateCtsTask]: Select instance failed");
        }
        if(instance.length == 0) {
            throw new Error(`[updateCtsTask]: TaskId Not Found`);
        }
        if(instance.length != 1) {
            throw new Error(`[updateCtsTask]: Expected 1 task, found ${instance.length}`);
        }
    } catch(err) {
        transaction ? await transaction.rollback() : true;
        console.error('[updateCtsTask]:', err);
        return err;
    }

    // Updating the Task if it exists
    try {
        // Setting the fields to be updated
        const fields = Object.keys(UpdateCtsTaskInputType.getFields());
        console.log("[insertCtsTask]: fields:", fields);

        // Setting the Options to pass to the Query
        const updateOptions = {
            transaction: transaction,
            where: {
                task_id: input.task_id,
            },
            fields: fields,
            returning: true,
        }

        // Setting the required Update Data
        let updateData = {};
        updateData = Object.assign(updateData, input);

        // Running the Update Query
        const instance = await db.cts_task.update(updateData, updateOptions);
        if(!instance) {
            throw new Error("[updateCtsTask]: Sequelize update instance failed");
        }
        if(instance[0] == 0) {
            throw new Error(`[updateCtsTask]: Could not update the Task data`);
        }
        if(instance[1].length > 1) {
            throw new Error(`[updateCtsTask]: Expected 1 task, found ${instance[1].length}.`)
        }
        task = instance[1][0].dataValues;

    } catch(err) {
        transaction ? await transaction.rollback() : true;
        console.error('[updateCtsTask]:', err);
        return err;
    }

    try {
        transaction ? await transaction.commit() : true;
    } catch(err) {
        transaction ? await transaction.rollback() : true;
        console.error('[updateCtsTask]:', err);
        return err;
    }

    return task;
}

export default updateCtsTask;