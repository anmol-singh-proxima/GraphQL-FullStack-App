/**
 * Filename: queries/index.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

import { ctsAssignment } from './cts_assignment';
import { ctsProject } from './cts_project';
import { ctsTask } from './cts_task';
import { ctsUserRole } from './cts_user_role';
import { ctsUserType } from './cts_user_type';
import { ctsUser } from './cts_user';

async function queries() {
    return {
        ...await ctsAssignment(),
        ...await ctsProject(),
        ...await ctsTask(),
        ...await ctsUserRole(),
        ...await ctsUserType(),
        ...await ctsUser(),
    }
}

export { queries };