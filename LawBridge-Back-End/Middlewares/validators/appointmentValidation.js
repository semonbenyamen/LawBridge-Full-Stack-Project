const Joi = require("joi");

const validateAppointment = (req, res, next) => {
    const schema = Joi.object({
        lawyerId: Joi.string().required(),

        appointmentDate: Joi.date()
            .greater("now")
            .required()
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }
    
    req.body = value;

    next();
};

module.exports = { validateAppointment };