require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./Models/User");

const seedAdmin = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);

        const adminExists = await User.findOne({
            email: "admin@lawbridge.com"
        });

        if (adminExists) {
            console.log("Admin already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("Admin123@", 10);

        await User.create({
            firstName: "System",
            lastName: "Admin",
            email: "admin@lawbridge.com",
            phone: "01000000000",
            password: hashedPassword,
            role: "admin",
            isApproved: true
        });
        console.log("Admin Created Successfully");
        process.exit();

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seedAdmin();