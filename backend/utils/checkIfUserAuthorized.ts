/**
 * Filename: checkIfUserAuthorized.ts
 * Description: 
 * 
 * Create Date: 14 May 2024
 */

const checkIfUserAuthorized = async () => {
    // console.log('[checkIfUserAuthorized] Executing...');
    // const isAdmin = process.env.isAdmin === 'true' ? true : false;
    // const isLead = process.env.isLead === 'true' ? true : false;
    // const isStrd = process.env.isStrd === 'true' ? true : false;
}

const checkIfUserAdmin = () => {
    const isAdmin = process.env.isAdmin === 'true' ? true : false;
    return isAdmin;
}

const checkIfUserLead = () => {
    const isLead = process.env.isLead === 'true' ? true : false;
    return isLead;
}

const checkIfUserStrd = () => {
    const isStrd = process.env.isStrd === 'true' ? true : false;
    return isStrd;
}

export default checkIfUserAuthorized;

export {
    checkIfUserAdmin,
    checkIfUserLead,
    checkIfUserStrd,
}