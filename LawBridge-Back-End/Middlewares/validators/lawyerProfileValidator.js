const joi = require("joi");


const validateLawyerProfile = (req, res, next) => {
// === STEP 1 : Basic Information ===
    const schema = joi.object({
        fullName: joi.string().min(3).max(100).required(),
        primarySpecialization: joi.string().required(),

// Array to store multiple additional specializations selected by the lawyer
        additionalSpecializations: joi.array().items(joi.string()),
        yearsOfExperience: joi.number().min(0).max(60).required(),

// allows: the field to be empty without validation error
        bio: joi.string().max(500).allow(""),
   

// ==== STEP 2 : Office Details ===
        governorate: joi.string().required(),

// District or area inside the governorate
        district: joi.string().required(),
        officeAddress: joi.string().min(5).required(),

// pattern: allows numbers only
        officePhone: joi.string().pattern(/^[0-9]+$/).required(),
        whatsappNumber: joi.string().pattern(/^[0-9]+$/).allow(""),

// Office location coordinates from map
        officeLocation: joi.object({
// lat = Latitude / lng = Longitude
            lat: joi.number().required(),
            lng: joi.number().required()
        }).required(),


// === STEP 3 : Availability ===        
// Array of selected working days
        workingDays: joi.array().items(joi.string()).required(),
        startTime: joi.string().required(),
        endTime: joi.string().required(),
        appointmentDuration: joi.number().valid(30, 60, 90).required(),
        consultationFee: joi.number().min(0).allow(null)
    });

    const { error, value } = schema.validate(req.body);

    if(error) {
        return res.status(400).json({
            msg: error.details[0].message
        });
    }

    req.body = value;
    next();
};

module.exports = { validateLawyerProfile };