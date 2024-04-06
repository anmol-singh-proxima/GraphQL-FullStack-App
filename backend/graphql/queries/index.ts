/**
 * Filename: queries/index.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

import { ctsUser } from './cts_user';
import { ctsUserType } from './cts_user_type';
import { ctsUserRole } from './cts_user_role';

async function queries() {
    return {
        ...await ctsUser(),
        ...await ctsUserType(),
        ...await ctsUserRole(),
    }
}

export { queries };