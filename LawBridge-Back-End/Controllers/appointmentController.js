const Appointment = require("../Models/Appointment");
const User = require("../Models/User");


// Create Appointment
const createAppointment = async (req, res, next) => {
    try {
        const { lawyerId, appointmentDate } = req.body;

    // Check lawyer exists
        const lawyer = await User.findById(lawyerId);

        if (!lawyer || lawyer.role !== "lawyer") {
            return res.status(404).json({ msg: "Lawyer not found" });
        }

    // Check lawyer approved
        if (!lawyer.isApproved) {
            return res.status(400).json({ msg: "Lawyer is not approved" });
        }


        if (new Date(appointmentDate) < new Date()) {
            return res.status(400).json({ msg: "Appointment date must be in the future" });
        }



    // Check if slot already booked
        const existingAppointment = await Appointment.findOne({
            lawyer: lawyerId,
            appointmentDate: new Date(appointmentDate),
            status: { $in: ["pending", "confirmed"]}
        });

        if (existingAppointment) {
            return res.status(400).json({ msg: "This time slot is already booked" });
        }


        const appointment = await Appointment.create({
            client: req.user.id,
            lawyer: lawyerId,
            appointmentDate,
            status: "pending"
        });

        res.status(201).json({ msg: "Appointment booked successfully", appointment });

    } catch (error) {
        next(error);
    }
};


// Get My Appointments
const getMyAppointments = async (req, res, next) => {
    try {
        let appointments;

        if (req.user.role === "client") {
            appointments = await Appointment.find({
                client: req.user.id
            })

            .populate("lawyer", "firstName lastName email");

        } else if (req.user.role === "lawyer") {
            appointments = await Appointment.find({
                lawyer: req.user.id
            })
            .populate("client", "firstName lastName email");
            
        } else {
            appointments = await Appointment.find()
            .populate("client", "firstName lastName")
            .populate("lawyer", "firstName lastName");
        }

        res.status(200).json(appointments);

    } catch (error) {
        next(error);
    }
};


// Cancel Appointment
const cancelAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ msg: "Appointment not found" });
        }

    // Only owner can cancel
        if (
            appointment.client.toString() !== req.user.id &&
            appointment.lawyer.toString() !== req.user.id
        ) {
            return res.status(403).json({ msg: "Not authorized" });
        }

        appointment.status = "cancelled";
        await appointment.save();
        res.status(200).json({ msg: "Appointment cancelled successfully" });

    } catch (error) {
        next(error);
    }
};


// Confirm Appointment
const confirmAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if(!appointment) {
            return res.status(404).json({ msg: "Appointment not found" });
        }

        if (appointment.lawyer.toString() !== req.user.id) {
            return res.status(403).json({ msg: "Only lawyer can confirm appointments" });
        }

        appointment.status = "confirmed";
        await appointment.save();

        res.status(200).json({ msg: "Appointment confirmed successfully" });

    } catch (error) {
        next(error);
    }
};

module.exports = { createAppointment, getMyAppointments, cancelAppointment, confirmAppointment };
