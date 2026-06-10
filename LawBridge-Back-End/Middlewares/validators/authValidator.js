const joi = require("joi");
const { emit } = require("../../Models/User");

const validateRegister = (req, res, next) => {
    const schema = joi.object({
    firstName: joi.string().min(2).max(30).required(),
    lastName: joi.string().min(2).max(30).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org']}}).required(),
    phone: joi.string().pattern(/^[0-9]+$/).message("The phone number must contain numbers only.").required(),
    password: joi.string().min(8).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])")).message("Password must contain uppercase, lowercase, number and special character.").required(),
    role: joi.string().valid("client", "lawyer").required()
    });

// value and error together
    const { error, value } = schema.validate(req.body, {
        allowUnknown: true
    });

    if (error) {
        return res.status(400).json({ msg: error.details[0].message});
    }

// Passing the clean and checked value to the Controller
    req.body = value;
    next();
};

const validateLogin = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            msg: error.details[0].message
        });
    }
    req.body = value;
    next();
};


module.exports = { validateRegister, validateLogin };