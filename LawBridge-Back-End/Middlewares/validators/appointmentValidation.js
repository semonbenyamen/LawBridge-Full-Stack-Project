const Joi = require("joi");

const validateAppointment = (req, res, next) => {
    const schema = Joi.object({
        lawyerId: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
                "string.pattern.base": "The lawyer's ID (lawyerId) is incorrect",
                "any.required": "LawyerId field required"
            }),
        appointmentDate: Joi.date()
            .iso()
            .required()
            .messages({
                "date.format": "The date format is incorrect; it should be ISO Date.",
                "any.required": "Appointment date required"
            })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }

    next();
};

module.exports = { validateAppointment };