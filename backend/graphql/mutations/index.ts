/**
 * Filename: mutations/index.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

import { ctsUserMutation } from './ctsUserMutation';

async function mutations() {
    return {
        ...await ctsUserMutation(),
    }
}

export { mutations };