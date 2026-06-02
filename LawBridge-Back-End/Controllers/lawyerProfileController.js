const LawyerProfile  = require("../Models/LawyerProfile");

// Create Profile
const createLawyerProfile  = async (req, res, next) => {
    try {
        const existingProfile = await LawyerProfile.findOne({
            user: req.user.id
        });

        if (existingProfile) {
            return res.status(400).json({
                msg: "Profile already exists" 
            });
        }

        const profile  = await LawyerProfile.create({
            user: req.user.id,
            ...req.body,

            profileImage: req.file ? req.file.filename : null,

            profileCompleted: true
        });

        res.status(201).json({
            msg: "Lawyer profile created successfully",
            profile
        });
    } catch (error) {
        next(error);
    }
};


// Get Current Lawyer Profile
const getLawyerProfile = async (req, res, next) => {
    try {
        const profile = await LawyerProfile.findOne({ user: req.user.id })
        .populate("user", "firstName lastName email phone");

        if(!profile) {
            return res.status(404).json({ msg: "Profile not found"});
        }

        res.status(200).json(profile);
    } catch (error) {
        next(error);
    }
};


// Update Lawyer Profile
const updateLawyerProfile = async (req, res, next) => {
    try{
        let profile = await LawyerProfile.findOne({ user: req.user.id });

        if(!profile) {
            return res.status(404).json({ msg: "Profile not found"});
        }

    // If a new image is uploaded, update it
        if(req.file) {
            req.body.profileImage = req.file.filename;
        }

        profile = await LawyerProfile.findOneAndUpdate(
            {user: req.user.id},
            {$set: req.body},
            {new: true, runValidators: true}
        ).populate("user", "firstName lastName email phone");

        res.status(200).json({ msg: "Profile updated successfully", profile});
    } catch (error) {
        next(error);
    }
};

module.exports = {createLawyerProfile, getLawyerProfile, updateLawyerProfile};