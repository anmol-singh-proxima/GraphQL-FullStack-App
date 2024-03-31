/**
 * Filename: mutations/index.ts
 * Description: 
 * 
 * Create Date: 29 Mar 2024
 */

import { createUser } from './createUser';
import { loginUser } from './loginUser';

async function mutations() {
    return {
        ...await createUser(),
        ...await loginUser(),
    }
}

export { mutations };