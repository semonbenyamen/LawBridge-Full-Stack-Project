const express = require("express");
const router = express.Router();

const { createAppointment, getMyAppointments, cancelAppointment, confirmAppointment, completeAppointment, getAvailableSlots } = require("../Controllers/appointmentController");

const { protect } = require("../Middlewares/authMiddleware");

const { validateAppointment } = require("../Middlewares/validators/appointmentValidation");

router.post("/", protect, validateAppointment, createAppointment);

router.get("/my", protect, getMyAppointments);

router.put("/:id/cancel", protect, cancelAppointment);

router.put("/:id/confirm", protect, confirmAppointment);

router.put("/:id/complete", protect, completeAppointment);

router.get("/available-slots", getAvailableSlots);

module.exports = router;