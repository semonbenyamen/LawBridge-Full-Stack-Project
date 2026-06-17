const { required } = require("joi");
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
    appointmentDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "completed"],
        default: "pending"
    },
    consultationFee: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);