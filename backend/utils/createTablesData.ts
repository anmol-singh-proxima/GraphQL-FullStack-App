/**
 * Filename: utils.ts
 * Description: Utility File having utility functions needed in the Server
 * 
 * Create Date: 29 Mar 2024
 */

import db from '../models';
import { assignments } from '../seeders/AssignmentData';
import { projects } from '../seeders/ProjectData';
import { tasks } from '../seeders/TaskData';
import { users } from '../seeders/UserData';
import { userRoles } from '../seeders/UserRoleData';
import { userTypes } from '../seeders/UserTypeData';

// Function to add the Data rows in the cts_assignment table in the Database
export const createAssignments = () => {
    assignments.map((assignment: Object) => {
        db.cts_assignment.create(assignment)
            .then((response: any) => {
                console.log('AssignmentData Success Response:', response.toJSON());
            })
            .catch((err: any) => {
                console.log("AssignmentData Create Error:", err);
                console.log("AssignmentData:", assignment);
            });
    })
}

// Function to add the Data rows in the cts_project table in the Database
export const createProjects = () => {
    projects.map(project => {
        db.cts_project.create(project)
            .then((response: any) => {
                console.log('ProjectData Success Response:', response.toJSON());
            })
            .catch((err: any) => {
                console.log("ProjectData Create Error:", err);
                console.log("ProjectData:", project);
            });
    })
}

// Function to add the Data rows in the cts_task table in the Database
export const createTasks = () => {
    tasks.map(task => {
        db.cts_task.create(task)
            .then((response: any) => {
                console.log('TaskData Success Response:', response.toJSON());
            })
            .catch((err: any) => {
                console.log("TaskData Create Error:", err);
                console.log("TaskData:", task);
            });
    })
}

// Function to add the Data rows in the cts_user table in the Database
export const createUsers = () => {
    users.map(user => {
        db.cts_user.create(user)
            .then((response: any) => {
                console.log('UserData Success Response:', response.toJSON());
            })
            .catch((err: any) => {
                console.log("UserData Create Error:", err);
                console.log("UserData:", user);
            });
    })
}

// Function to add the Data rows in the cts_user_role table in the Database
export const createUserRoles = () => {
    userRoles.map(userRole => {
        db.cts_user_role.create(userRole)
            .then((response: any) => {
                console.log('UserRoleData Success Response:', response.toJSON());
            })
            .catch((err: any) => {
                console.log("UserRoleData Create Error:", err);
                console.log("UserRoleData:", userRole);
            });
    })
}

// Function to add the Data rows in the cts_user_type table in the Database
export const createUserTypes = () => {
    userTypes.map(userType => {
        db.cts_user_type.create(userType)
            .then((response: any) => {
                console.log('UserTypeData Success Response:', response.toJSON());
            })
            .catch((err: any) => {
                console.log("UserTypeData Create Error:", err);
                console.log("UserTypeData:", userType);
            });
    })
}