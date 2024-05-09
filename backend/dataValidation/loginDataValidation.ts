/**
 * Filename: loginDataValidation.ts
 * Description: File to Validate the Data received from the Login Form
 * 
 * Create Date: 08 May 2024
 */

const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: {
            allow: ['com']
        }
    }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$!%^&*?]{1,30}$')).min(8).max(30).required(),
})

const loginDataValidation = (dataToValidate: Object) => {
    const { error, value } = loginSchema.validate(dataToValidate, { abortEarly: false });
    return {
        error,
        value
    }
}

export default loginDataValidation;