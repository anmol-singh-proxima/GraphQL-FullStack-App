import { ctsUser } from './cts__user';
import { ctsUserType } from './cts__user_type';

async function queries() {
    return {
        ...await ctsUser(),
        ...await ctsUserType(),
    }
}

export { queries };