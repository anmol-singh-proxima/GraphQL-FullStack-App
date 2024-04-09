/**
 * Filename: UserRoleData.ts
 * Description: UserRole Data to enter into the Database
 * 
 * Create Date: 05 Apr 2024
 */

export const userRoles = [
    { 
        role_id: 'ADMN',
        role_name: 'Administrator',
        type_id: 'ADMN',
    },
    { 
        role_id: 'PRMN',
        role_name: 'Project Manager',
        type_id: 'LEAD',
    },
    { 
        role_id: 'PRLE',
        role_name: 'Project Lead',
        type_id: 'LEAD',
    },
    { 
        role_id: 'DESG',
        role_name: 'Designer',
        type_id: 'STRD',
    },
    { 
        role_id: 'DVPR',
        role_name: 'Developer',
        type_id: 'STRD',
    },
    { 
        role_id: 'TSTR',
        role_name: 'Tester',
        type_id: 'STRD',
    },
    { 
        role_id: 'VLDR',
        role_name: 'Validator',
        type_id: 'STRD',
    },
    { 
        role_id: 'SPRT',
        role_name: 'Support',
        type_id: 'STRD',
    },
];