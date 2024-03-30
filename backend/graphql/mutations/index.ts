import { createUser } from './createUser';

async function mutations() {
    return {
        ...await createUser(),
    }
}

export { mutations };