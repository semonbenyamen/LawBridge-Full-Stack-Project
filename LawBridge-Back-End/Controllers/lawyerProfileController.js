const LawyerProfile  = require("../Models/LawyerProfile");

const createLawyerProfile  = async (req, resizeBy, next) => {
    try {
        const existingProfile = await LawyerProfile.findOne({
            user: req.user.id
        });

        if (existingProfile) {
            return resizeBy.status(400).json({
                msg: "Profile already exists" 
            });
        }

        const profile  = await LawyerProfile.create({
            user: req.user.id,
            ...req.body,

            profileImage: req.file ? req.file.filename : null,

            profileCompleted: true
        });
    }
}