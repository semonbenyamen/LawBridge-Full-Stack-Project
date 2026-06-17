import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LawyerCard.module.css";

function LawyerCard({ lawyer }) {

    const navigate = useNavigate();

    return (
        <div className={styles.card}>

    {/* Top Section */}
            <div className={styles.top}>

{/* Avatar or first letter */}
            <div className={styles.avatar}>
                {lawyer.profileImage ? (
                    <img src={`http://localhost:3000/uploads/${lawyer.profileImage}`}
                    alt={lawyer.fullName}
                    className={styles.img}/>
                ): (
                    <div className={styles.fallback}>
                        {lawyer.fullName?.charAt(0) || "L"}
                    </div>
                )}
            </div>

            {/* Lawyer availability status */}
            <span
                className={
                    lawyer.status === "Available"
                    ? styles.available
                    : styles.busy
                }
            >
                {lawyer.status}
            </span>
            </div>


            {/* Info  */}
            <div className={styles.body}>
                <h3 className={styles.name}>{lawyer.fullName}</h3>

                <span className={styles.spec}>
                    {lawyer.primarySpecialization} Law</span>

            {/* Lawyer rating and reviews */}
                    <p className={styles.rating}>
                        ⭐ {lawyer.rating}
                        <span> ({lawyer.reviews} reviews)</span>
                    </p>

                    <p className={styles.location}>
                        <i className="fa-solid fa-location-dot"></i>
                        {lawyer.governorate}, {lawyer.district}
                    </p>
            </div>

            {/* Card actions / Buttons */}
            <div className={styles.actions}>
                <button 
                    className={styles.profileBtn}
                    onClick={() => navigate(`/lawyers/${lawyer._id}`)}
                > View Profile</button>
                    
                <button className={styles.bookBtn}
                    onClick={(e) => navigate(`/lawyers/${lawyer._id}#booking`)}
                    > Book Now</button>

            </div>
        </div>
        
    );
}

export default LawyerCard;