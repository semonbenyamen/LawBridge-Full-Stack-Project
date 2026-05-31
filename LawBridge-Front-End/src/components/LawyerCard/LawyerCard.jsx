import React from "react";
import styles from "./LawyerCard.module.css";

function LawyerCard({ lawyer, onClick, showFeaturedBadge = false }) {
    return (
        <div className={styles.card} onClick={onClick}>

{/* Photo of the lawyer or the first letter of his name */}
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

                {/* Featured badge — only shown when prop is true and lawyer is featured */}

                {showFeaturedBadge && lawyer.isFeatured && (
                    <span className={styles.badge}>Featured</span>
                )}
            </div>
            {/* Info  */}
            <div className={styles.body}>
                <h3 className={styles.name}>{lawyer.fullName}</h3>

                <span className={styles.spec}>
                    {lawyer.primarySpecialization} Law</span>

                    <p className={styles.location}>
                        <i className="fa-solid fa-location-dot"></i>
                        {lawyer.district}, {lawyer.governorate}
                    </p>

                    <div className={styles.meta}>
                        <span className={styles.exp}>
                            <i className="fa-solid fa-briefcase"></i>
                            {lawyer.yearsOfExperience}yrs exp</span>

                        <span className={styles.fee}>
                            {lawyer.consultationFee > 0 
                                ? `EGP ${lawyer.consultationFee}`
                                : "Free Consultation"}
                        </span>
                    </div>
            </div>

            <button className={styles.btn}>View Profile</button>

        </div>
    );
}

export default LawyerCard;