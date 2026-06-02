const express = require("express");
const router = express.Router();

const { searchLawyers, getLawyerById, getFeaturedLawyers, getLatestLawyers } = require("../Controllers/searchController");

router.get("/lawyers", searchLawyers);

router.get("/featured", getFeaturedLawyers);

router.get("/latest", getLatestLawyers);

router.get("/lawyers/:id", getLawyerById);


module.exports = router;