/**
 * Filename: AssignmentData.ts
 * Description: Assignment Data to enter into the Database
 * 
 * Create Date: 07 Apr 2024
 */

export const assignments = [
    // Admin assigning Projects to the Project Manager
    {
        assignment_id: '1',
        user_id: 'Z01000',
        project_id: 'PA0100',
        assigned_by: 'Z00007',
    },
    {
        assignment_id: '2',
        user_id: 'Z01000',
        project_id: 'PA0101',
        assigned_by: 'Z00007',
    },
    {
        assignment_id: '3',
        user_id: 'Z01000',
        project_id: 'PA0102',
        assigned_by: 'Z00007',
    },

    // Project Manager assigning Projects to their respective Project Leads
    {
        assignment_id: '4',
        user_id: 'Z02000',
        project_id: 'PA0100',
        assigned_by: 'Z01000',
    },
    {
        assignment_id: '5',
        user_id: 'Z02001',
        project_id: 'PA0101',
        assigned_by: 'Z01000',
    },
    {
        assignment_id: '6',
        user_id: 'Z02002',
        project_id: 'PA0102',
        assigned_by: 'Z01000',
    },

    // Assigning Project 'PA0100' to the Desginers, Developers, Testers, Validators and Support Member
    {
        assignment_id: '7',
        user_id: 'Z03002',
        project_id: 'PA0100',
        assigned_by: 'Z02000',
    },

    // Assigning Project 'PA0101' to the Desginers, Developers, Testers, Validators and Support Member
    {
        assignment_id: '8',
        user_id: 'Z03000',
        project_id: 'PA0101',
        assigned_by: 'Z02001',
    },
    {
        assignment_id: '9',
        user_id: 'Z03001',
        project_id: 'PA0101',
        assigned_by: 'Z02001',
    },
    {
        assignment_id: '10',
        user_id: 'Z03004',
        project_id: 'PA0101',
        assigned_by: 'Z02001',
    },
];