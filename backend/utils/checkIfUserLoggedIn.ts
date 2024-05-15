/**
 * Filename: checkIfUserLoggedIn.ts
 * Description: 
 * 
 * Create Date: 13 May 2024
 */

import getUserByToken from "./getUserByToken";

const checkIfUserLoggedIn = async (req: any, res: any) => {
    console.log('[checkIfUserLoggedIn] Executing...');
    console.log('[checkIfUserLoggedIn] Request.headers:', req.headers);
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.split(' ')[1] || '';
        console.log('[checkIfUserLoggedIn] Token:', token);
        try {
            const response = await getUserByToken(token);
            console.log('[checkIfUserLoggedIn] getUserByToken Response:', response);
            if(response) {
                return response;
            } else {
                console.log('[checkIfUserLoggedIn] User is not Authorized!');
                res.status(401).json({
                    code: 'UNAUTHORIZED',
                    message: 'User Not Authorized!'});
                res.end();
                return null;
            }
        // getUserByToken(token).then((response) => {
        //     console.log('[checkIfUserLoggedIn] Promise Response:', response);
        //     if(response) {
        //         return response;
        //     } else {
        //         console.log('[checkIfUserLoggedIn] User is not Authorized!');
        //         res.status(401).json({
        //             code: 'UNAUTHORIZED',
        //             message: 'User Not Authorized!'});
        //         res.end();
        //         return null;
        //     }
        } catch(err) {
            console.log('[checkIfUserLoggedIn] Error in Verifying Token:', err);
            res.status(500).json({
                code: 'INTERNALSERVERERROR',
                message: 'Internal Server Error!'});
            res.end();
            return null;
        }
    } else {
        console.log('[checkIfUserLoggedIn] No Authorization from User!');
        res.status(401).send({
            code: 'UNAUTHORIZED',
            message: 'User Not Authorized!'});
        res.end();
        return null;
    }
}

export default checkIfUserLoggedIn;