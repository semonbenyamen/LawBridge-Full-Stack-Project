const LawyerProfile = require("../Models/LawyerProfile");

// Get all lawyers + search filters
const searchLawyers = async (req, res, next) => {
    try{
// Extract query params from URL
        const {specialization, governorate, district, minExperience, name, page = 1, limit = 10, sortBy} = req.query;

// Empty filter object
        let filter = {};

// Return completed profiles only
        filter.profileCompleted = true;

// === Specialization Filter ===
// Search in primary specialization
        if (specialization) {
            filter.$or = [
                {primarySpecialization: specialization},
// Search in additional specializations array
                {additionalSpecializations: {$in: [specialization]}}
            ];
        }
// === Governorate Filter ===
        if (governorate) {
            filter.governorate = governorate;
        }
// === District Filter ===
        if (district) {
            filter.district = district;
        }
// === Experience Filter ===
        if (minExperience) {
            filter.yearsOfExperience = {
                $gte: Number(minExperience)};
        }

        if (name) {
            filter.fullName = {
                $regex: name,
                $options: "i"
            };
        }

// Pagination calculation
        const skip = (page - 1) * limit;

// Sorting object
        let sortOptions = {};

// === Sorting ===
    // Sort by highest experience
        if (sortBy === "experience") {
            sortOptions.yearsOfExperience = -1;
        }

    // Sort by lowest consultation fee
        if (sortBy === "fee") {
            sortOptions.consultationFee = 1;
        }

    // Sort by latest profiles
        if (sortBy === "latest") {
            sortOptions.createdAt = -1;
        }

// Get lawyers based on filters
        const lawyers = await LawyerProfile.find(filter)
        .populate("user", "firstName lastName")
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit));


        const total = await LawyerProfile.countDocuments(filter);

        res.status(200).json({
            total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            results: lawyers.length,
            lawyers
        });

    } catch (error) {
        next(error)
    }
};



// Get single lawyer by ID
const getLawyerById = async (req, res, next) => {
    try{
        const lawyer = await LawyerProfile.findOne({
            _id: req.params.id,
            profileCompleted: true
        })
        .populate("user", "firstName lastName");

// Check if lawyer exists
        if (!lawyer) {
            return res.status(404).json({msg: "Lawyer not found"})
        }

        res.status(200).json(lawyer);

    } catch (error) {
        next(error);
    }
};


// Get featured lawyers
const getFeaturedLawyers = async (req, res, next) => {
    try {
    const lawyers = await LawyerProfile.find({
        isFeatured: true,
        profileCompleted: true
    })

    .populate("user", "firstName lastName")
    .limit(6);

    res.status(200).json(lawyers);

    } catch (error) {
        next(error);
    }
};

const getLatestLawyers = async (req, res, next) => {
    try{
        const lawyers = await LawyerProfile.find({
            profileCompleted: true
        })
        .populate("user", "firstName lastName")
        .sort({createdAt: -1})
        .limit(6);

        res.status(200).json(lawyers);

    } catch (error) {
        next(error);
    }
}

module.exports = { searchLawyers, getLawyerById, getFeaturedLawyers, getLatestLawyers };