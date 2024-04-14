/**
 * Filename: mutations/index.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

import { ctsUserMutation } from './ctsUserMutation';
import { ctsTaskMutation } from './ctsTaskMutation';

async function mutations() {
    return {
        ...await ctsUserMutation(),
        ...await ctsTaskMutation(),
    }
}

export { mutations };