const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },

    phone: {
        type: String,
        required: true
    },

    password : {
        type : String,
        required: true,
        minlength: 8
    },
    role : {
        type : String,
        enum: ["client" , "lawyer", "admin"],
        default : "client"
    },

  // Admin approval
    isApproved: {
        type: Boolean,
        default: false
    },
// Photo of lawyer's ID card
    lawyerCardImage: {
        type: String,
        default: null
    }
},
    { timestamps : true });

    module.exports = mongoose.model("User", userSchema);