const mongoose = require("mongoose");

const lawyerProfileSchema = new mongoose.Schema({

// Connect profile with ....
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

// === STEP 1 : Basic Information ===
    profileImage: {
        type: String,
        default: null
    },

    fullName: {
        type: String,
        trim: true
    },

    primarySpecialization: {
        type: String
    },

// Additional lawyer specializations
    additionalSpecializations: [{
        type: String
    }],

    yearsOfExperience: {
        type: Number
    },

    bio: {
        type: String,
        maxLength: 500
    },


// === STEP 2 : Office Details ===

    governorate: {
        type: String
    },

    district: {
        type: String
    },

    officeAddress: {
        type: String
    },

    officePhone: {
        type: String
    },

    whatsappNumber: {
        type: String
    },

// Office location coordinates from map
    officeLocation: {
        lat: Number,
        lng: Number
    },

// === STEP 3 : Availability & Hours ===

// Lawyer available working days
    workingDays: [{
        type: String
    }],

    startTime: {
         type: String
    },

    endTime: {
        type: String
    },

// Consultation duration in minutes
    appointmentDuration: {
        type: Number,
        enum: [30, 60, 90]
    },

    consultationFee: {
        type: Number,
        default: 0
    },

// Check if profile completed
    profileCompleted: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});

module.exports = mongoose.model("LawyerProfile", lawyerProfileSchema);