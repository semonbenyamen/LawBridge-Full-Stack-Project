const express = require("express");
const router = express.Router();

const { createAppointment, getMyAppointments, cancelAppointment, confirmAppointment } = require("../Controllers/appointmentController");

const { protect } = require("../Middlewares/authMiddleware");

router.post("/", protect, createAppointment);

router.get("/my", protect, getMyAppointments);

router.put("/:id/cancel", protect, cancelAppointment);

router.put("/:id/confirm", protect, confirmAppointment);

module.exports = router;