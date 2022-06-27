//Validation
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation  = (data) => {
    const schema = {
        firstName : Joi.string().min(6).required(),
        lastName : Joi.string(),
        email : Joi.string().email().min(6).required(),
        password : Joi.string().min(6).required(),
        address : Joi.required(),
        phone : Joi.number().required(),
        role : Joi.string().required()
    };
    return Joi.validate(data,schema);
}

//Login Validation
const loginValidation  = (data) => {
    const schema = {
        email : Joi.string().email().min(6).required(),
        password : Joi.string().required()
    };
    return Joi.validate(data,schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;