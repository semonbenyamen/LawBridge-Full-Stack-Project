import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { lawyers } from "../../data/lawyers";
import styles from "./LawyerDetails.module.css";

function LawyerDetails() {
    const { id } = useParams();

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [booking, setBooking] = useState(false);
    const [caseDescription, setCaseDescription] = useState("");

useEffect(() => {
    if (window.location.hash === "#booking") {
        const bookingSection = document.getElementById("booking");

        bookingSection?.scrollIntoView({
            behavior: "smooth",
        });
    }
}, []);

useEffect(() => {
    if (selectedDate) {
        setSelectedSlot("");
        setLoadingSlots(true);

        setTimeout(() => {
            setAvailableSlots([
                "10:00 AM",
                "11:00 AM",
                "01:00 PM",
                "03:00 PM",
            ]);

            setLoadingSlots(false);
        }, 500);
    }
}, [selectedDate]);

const handleBooking = async () => {
    setBooking(true);

    try {
        console.log({
            selectedDate,
            selectedSlot,
            caseDescription,
        });

        await new Promise((resolve) =>
            setTimeout(resolve, 1000)
        );

        alert("Appointment booked successfully");
    } finally {
        setBooking(false);
    }
};

const lawyer = lawyers.find(
    (item) => item._id === id
);

if (!lawyer) {
    return <h2>Lawyer Not Found</h2>;
}

    return(
        <div className={styles.page}>

    {/* Profile Header */}
            <div className={styles.header}>
                <div className={styles.avatar}>
                    {lawyer.fullName?.charAt(0)}
                </div>

            <div className={styles.info}>
                <h1>{lawyer.fullName}</h1>
                <div className={styles.specialization}>
                    {lawyer.specialization.map((item) => (
                        <span key={item}>{item}</span>
                    ))}
                </div>

                <div className={styles.stats}>

                    <div className={styles.statBox}>
                        <span className={styles.statIcon}>💼</span>
                        <div className={styles.statText}>
                            <small>Experience</small>
                        <strong>{lawyer.experience} years</strong>
                        </div>
                    </div>

                    <div className={styles.statBox}>
                        <span className={styles.statIcon}>⭐</span>
                        <div className={styles.statText}>
                            <small>Rating</small>
                        <strong>{lawyer.rating}/5.0</strong>
                        </div>
                    </div>

                    <div className={styles.statBox}>
                        <span className={styles.statIcon}>🏅</span>
                        <div className={styles.statText}>
                            <small>Reviews</small>
                        <strong>{lawyer.reviews}</strong>
                        </div>
                    </div>

                    <div className={styles.statBox}>
                        <span className={styles.statIcon}>🎗️</span>
                        <div className={styles.statText}>
                            <small>Profile Views</small>
                        <strong>{lawyer.profileViews}</strong>
                        </div>
                    </div>
                </div>
            </div>

            <span 
                className={
                    lawyer.status === "Available"
                    ? styles.available
                    : styles.busy
                }>
                    {lawyer.status}
            </span>
        </div>

    {/* About  */}
        <div className={styles.section}>
            <h2>About</h2>
            <p>{lawyer.about}</p>
        </div>

    {/* Details  */}
        <div className={styles.section}>
            <h2>Office Details</h2>
            <h4>Address</h4>
            <p>{lawyer.address}</p>

            <h4>Phone</h4>
            <p>{lawyer.phone}</p>

            <h4>Working Hours</h4>
            {lawyer.workingHours.map((item) => (
                <p key={item}>{item}</p>
            ))}
        </div>

    {/* Reviews */}
        <div className={styles.section}>
            <h2>Client Reviews</h2>
            {lawyer.clientReviews.map((review) => (
                <div
                    key={review.name}
                    className={styles.reviewCard}
                >
                    <h4>{review.name}</h4>
                    <small>{review.date}</small>
                    <p>{review.text}</p>
                </div> 
            ))}
        </div>

    {/* Appointment Booking Section */}
  <div id="booking" className={styles.section}>
    <h2 className={styles.bookingTitle}>Book an Appointment</h2>
 
    <div className={styles.bookingGroup}>
        <label>Consultation Type</label>
        <select className={styles.input}>
            <option>General Consultation</option>
        </select>
    </div>
 
    {/* Date picker — minimum is today, can't book in the past */}
    <div className={styles.bookingGroup}>
        <label>Select Date</label>
        <input
            type="date"
            className={styles.input}
            min={new Date().toISOString().split("T")[0]}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
        />
    </div>
 
    {/* Time slots — fetched dynamically based on selected date */}
    <div className={styles.bookingGroup}>
        <label>Available Time Slots</label>
 
        {!selectedDate ? (
            <p className={styles.slotHint}>Please select a date first</p>
        ) : loadingSlots ? (
            <p className={styles.slotHint}>Loading available slots...</p>
        ) : availableSlots.length === 0 ? (
            <p className={styles.slotHint}>No available slots on this day</p>
        ) : (
            <div className={styles.timeSlotsGrid}>
                {availableSlots.map((slot) => (
                    <button
                        key={slot}
                        type="button"
                        className={`${styles.slotBtn} ${selectedSlot === slot ? styles.slotActive : ""}`}
                        onClick={() => setSelectedSlot(slot)}
                    >
                        {slot}
                    </button>
                ))}
            </div>
        )}
    </div>
 
    <div className={styles.bookingGroup}>
        <label>Case Description</label>
        <textarea
            placeholder="Briefly describe your legal matter..."
            className={styles.textarea}
            value={caseDescription}
            onChange={(e) => setCaseDescription(e.target.value)}
        />
    </div>
 
    <button
        className={styles.confirmBookBtn}
        onClick={handleBooking}
        disabled={booking || !selectedDate || !selectedSlot}
    >
        {booking ? "Booking..." : "Confirm Booking"}
    </button>
 
    <p className={styles.note}>
        LawBridge is an intermediary platform only and is not responsible for case outcomes.
    </p>
</div>
</div>
    );
}

export default LawyerDetails;