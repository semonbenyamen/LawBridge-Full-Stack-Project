const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    lawyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
// Appointment start date & time
    appointmentDate: {
        type: Date,
        required: true
    },
// Duration in minutes
    appointmentDuration: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "completed"],
        default: "pending"
    },
// Consultation fee at booking time
    consultationFee: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);