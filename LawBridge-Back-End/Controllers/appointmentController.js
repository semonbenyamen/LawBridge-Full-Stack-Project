const LawyerProfile = require("../Models/LawyerProfile");
const Appointment = require("../Models/Appointment");
const User = require("../Models/User");


// Create Appointment
const createAppointment = async (req, res, next) => {
    try {
    // Extract data from request body
        const { lawyerId, appointmentDate } = req.body;

    // Check lawyer exists
        const lawyer = await User.findById(lawyerId);

        if (!lawyer || lawyer.role !== "lawyer") {
            return res.status(404).json({ msg: "Lawyer not found" });
        }

    // Check lawyer approved by admin
        if (!lawyer.isApproved) {
            return res.status(400).json({ msg: "Lawyer is not approved" });
        }

    // Prevent booking appointments in the past
        if (new Date(appointmentDate) < new Date()) {
            return res.status(400).json({ msg: "Appointment date must be in the future" });
        }

    // Get lawyer profile
        const profile = await LawyerProfile.findOne({ user: lawyerId });

        if(!profile) {
            return res.status(404).json({ msg: "Lawyer profile not found" });
        }

    // Get appointment day name
        const appointmentDay = new Date(appointmentDate).toLocaleDateString("en-US", {
            weekday: "long"
        });


    // Check if lawyer works on this day
        if (!profile.workingDays.includes(appointmentDay)) {
            return res.status(400).json({ msg: "Lawyer is not available on this day" });
        }

    // Extract appointment time
        const appointmentTime = new Date(appointmentDate).toTimeString().slice(0, 5);


    // Check if appointment time is inside working hours
        if (appointmentTime < profile.startTime || appointmentTime >= profile.endTime) {
            return res.status(400).json({ msg: "Appointment outside working hours" });
        }

    // Calculate appointment end time
    // Get appointment start time
        const newAppointmentStart = new Date(appointmentDate);
        const newAppointmentEnd = new Date(
            newAppointmentStart.getTime() + profile.appointmentDuration * 60000
        );

    // Check if slot already booked
    // Get all active appointments
        const existingAppointments = await Appointment.find({
            lawyer: lawyerId,
            status: {
                $in: ["pending", "confirmed"]
            }
        });

    // Check overlap with existing appointments
        for (const appointment of existingAppointments) {
            const existingStart = new Date(
                appointment.appointmentDate
            );

            const existingEnd = new Date(
                existingStart.getTime() + appointment.appointmentDuration * 60000
            );

            const overlap = 
                newAppointmentStart < existingEnd && newAppointmentEnd > existingStart;

                if (overlap) {
                    return res.status(400).json({ msg: "This time slot is already booked" });
                }
        }
  


        const appointment = await Appointment.create({
            client: req.user.id,
            lawyer: lawyerId,
            appointmentDate,
            appointmentDuration: profile.appointmentDuration,
            consultationFee: profile.consultationFee,
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

    // Only lawyer can confirm
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


// Complete Appointment
const completeAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ msg: "Appointment not found" });
        }
    
    // Only lawyer can complete appointment
        if (appointment.lawyer.toString() !== req.user.id) {
            return res.status(403).json({ msg: "Only lawyer can complete appointments" });
        }

    // Must be confirmed first
        if (appointment.status !== "confirmed") {
            return res.status(400).json({ msg: "Only confirmed appointments can be completed" });
        }

        appointment.status = "completed";
        await appointment.save();

        res.status(200).json({ msg: "Appointment completed successfully" });

    } catch (error) {
        next(error);
    }
};



const getAvailableSlots = async (req, res, next) => {
    try {

        const { lawyerId, date } = req.query;

        const profile = await LawyerProfile.findOne({
            user: lawyerId
        });

        if (!profile) {
            return res.status(404).json({
                msg: "Lawyer profile not found"
            });
        }

        const selectedDate = new Date(date);

        const dayName =
            selectedDate.toLocaleDateString(
                "en-US",{ weekday: "long" }
            );

        // Check working day
        if (!profile.workingDays.includes(dayName)) {
            return res.status(200).json({
                availableSlots: []
            });
        }

        const duration = profile.appointmentDuration;

    // Specify the start and end dates of the target day for booking searches
        const startOfDay = new Date (selectedDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);

        const appointments = await Appointment.find({
            lawyer: lawyerId,
            status: { $in: ["pending", "confirmed"] },

        // Just get today's appointments
            appointmentDate: { $gte: startOfDay, $lte: endOfDay }
        });

    // Setting start and end times for loops
        let slots = [];
        const current = new Date(selectedDate);
        const endTime = new Date(selectedDate);

        const [startHour, startMinute] = profile.startTime
            .split(":")
            .map(Number);

        const [endHour, endMinute] = profile.endTime
            .split(":")
            .map(Number);

        current.setHours( startHour, startMinute, 0, 0 );
        endTime.setHours(endHour, endMinute, 0, 0);

    // Calculate available appointments and check for conflicts
        while (current < endTime) {
            const slotStart = new Date(current);

            const slotEnd = new Date( current.getTime() + duration * 60000 );

            const conflict = appointments.some((appointment) => {
                const appointmentStart = new Date(appointment.appointmentDate);
                const appointmentEnd = new Date(
                    appointmentStart.getTime() + appointment.appointmentDuration * 60000
                );

                return slotStart < appointmentEnd && slotEnd > appointmentStart
            });

            if (!conflict) {
                slots.push(
                    slotStart.toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    })
                );
            }
        
        // Moving on to the next appointment based on the duration
            current.setMinutes(current.getMinutes() + duration);
        }

        // Successfully returning available appointments
        res.status(200).json({
            availableSlots: slots
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { createAppointment, getMyAppointments, cancelAppointment, confirmAppointment, completeAppointment, getAvailableSlots };
