const express = require("express");
const router = express.Router();

const { approveLawyer } = require("../Controllers/adminController");

const { protect } = require("../Middlewares/authMiddleware");
const { adminOnly } = require("../Middlewares/adminMiddleware");

router.put("/approve-lawyer/:id", protect, adminOnly, approveLawyer);

module.exports = router;