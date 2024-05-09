/**
 * Filename: userToken.ts
 * Description: File to Create and Verify the Token for User Authentication
 * 
 * Create Date: 09 May 2024
 */

const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const secretKey = process.env.JWT_SECRET;

// Function to create a new Token
const createToken = (payload: Object) => {
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
  } catch (error: any) {
    console.error('Error creating JWT:', error.message);
    return null;
  }
};

// Function to verify an existing Token
const verifyToken = (token: String) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error: any) {
    console.error('Error verifying JWT:', error.message);
    return null;
  }
};

export {
    createToken,
    verifyToken,
}