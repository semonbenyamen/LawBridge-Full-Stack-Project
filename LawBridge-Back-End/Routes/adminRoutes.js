const express = require("express");
const router = express.Router();

const { approveLawyer } = require("../Controllers/adminController");

router.put("/approve-lawyer/:id", approveLawyer);

module.exports = router;