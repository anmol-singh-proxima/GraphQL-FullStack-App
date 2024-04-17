/**
 * Filename: insertCtsTask.ts
 * Description: 
 * 
 * Create Date: 12 Apr 2024
 */

import { Op } from "sequelize";
import db from '../../models';
import InsertCtsTaskInputType from "../types/input/InsertCtsTaskInputType";

const insertCtsTask = async (root: any, { input }: any, context: any, info: any) => {
    console.log("Executing 'insertCtsTask' resolver...");
    console.log("input:", input);
    const transaction: any = await db.sequelize.transaction();
    let tasks: any = [];

    // Logic to check for the different scenarios before adding a new task into the database
    // 1. If there is assigned_by then there should be a user_id, and assigned_by must be the project_lead of the user
    // 2. 

    // Adding User if it doesn't exist
    try {
        // Setting the fields to be updated
        // const modelAttributes = db.cts_task.rawAttributes;
        // const excludedFields: string[] = [];

        // let fields = Object.keys(modelAttributes);
        // fields = fields.filter((field) => {
        //     return !excludedFields.includes(field)
        // });

        const fields = Object.keys(InsertCtsTaskInputType.getFields());
        console.log("[insertCtsTask]: fields:", fields);

        // Setting the Options to pass to the Query
        const createOptions = {
            transaction: transaction,
            returning: true,
            fields: fields,
        }

        // Setting the Data to be added
        let createData: {}[] = [];
        input.forEach((inputElement: any) => {
            let obj = {};
            obj = Object.assign(obj, inputElement);
            createData.push(obj);
        });
        console.log("[insertCtsTask]: CreateData:", createData);

        // Running the bulkCreate Query
        const instance = await db.cts_task.bulkCreate(createData, createOptions);
        if(!instance) {
            throw new Error("[insertCtsTask]: Sequelize create instance failed");
        }
        // user = instance.dataValues;
        console.log("[insertCtsTask]: Instance:", instance);
        instance.forEach((cts_task: any) => {
            tasks.push(cts_task.dataValues);
        });
        console.log("[insertCtsTask]: tasks:", tasks);

    } catch(err) {
        transaction ? await transaction.rollback() : true;
        console.error('[insertCtsTask]:', err);
        return err;
    }

    try {
        transaction ? await transaction.commit() : true;
    } catch(err) {
        transaction ? await transaction.rollback() : true;
        console.error('[insertCtsTask]:', err);
        return err;
    }

    return tasks;
}

export default insertCtsTask;