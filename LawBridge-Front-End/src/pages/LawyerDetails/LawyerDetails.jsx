import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { lawyers } from "../../data/lawyers";
import styles from "./LawyerDetails.module.css";

function LawyerDetails() {
    const { id } = useParams();


    useEffect(() => {
    if (window.location.hash === "#booking") {
        const bookingSection =
            document.getElementById("booking");

        bookingSection?.scrollIntoView({
            behavior: "smooth",
        });
    }
}, [window.location.hash]);

    const lawyer = lawyers.find (
        (item) => item._id === id
    );

    if (!lawyer) {
        return <h2>Lawyer Not Found</h2>
    }

    return(
        <div className={styles.page}>

    {/* Profile Header */}
            <div className={styles.header}>
                <div className={styles.avatar}>S</div>

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
        <div 
            id= "booking"
            className={styles.section}>
            <h2 className={styles.bookingTitle}>Book an Appointment</h2>

            <div className={styles.bookingGroup}>
                <label>Consultation Type</label>
                <select className={styles.input}>
                    <option>General Consultation</option>
            </select>
            </div>

            <div className={styles.bookingGroup}>
                <label>Select Date</label>
                <input 
                    type="date" 
                    className={styles.input}
                    defaultValue="2026-10-05" />
            </div>


            <div className={styles.bookingGroup}>
                <label>Available Time Slots</label>

                <div className={styles.timeSlotsGrid}>
                    <button type="button" className={styles.slotBtn}>9:00 AM</button>
                    <button type="button" className={styles.slotBtn}>10:00 AM</button>
                    <button type="button" className={styles.slotBtn}>11:00 AM</button>
                    <button type="button" className={styles.slotBtn}>12:00 PM</button>
                    <button type="button" className={styles.slotBtn}>1:00 PM</button>
                    <button type="button" className={styles.slotBtn}>2:00 PM</button>
                    <button type="button" className={styles.slotBtn}>3:00 PM</button>
                    <button type="button" className={styles.slotBtn}>4:00 PM</button>
                </div>
            </div>

            <div className={styles.bookingGroup}>
                <label>Case Description</label>
                <textarea 
                    placeholder="Briefly describe your legal matter..."
                    className={styles.textarea}
                />
            </div>

            <button className={styles.confirmBookBtn}>Confirm Booking</button>
            <p className={styles.note}>LawBridge is an intermediary platform only and is not responsible for case outcomes.</p>
         </div>
       </div> 
    );
}

export default LawyerDetails;