const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/uploadMiddleware");
const { protect } = require("../Middlewares/authMiddleware");
const { createLawyerProfile, getLawyerProfile, updateLawyerProfile } = require("../Controllers/lawyerProfileController");

const { validateLawyerProfile } = require("../Middlewares/validators/lawyerProfileValidator");
// Get profile route
router.get("/me", protect, getLawyerProfile);

// Create profile route
router.post("/", protect, upload.single("profileImage"), validateLawyerProfile, createLawyerProfile);

// Update profile route
router.put("/", protect, upload.single("profileImage"), validateLawyerProfile, updateLawyerProfile);

module.exports = router;