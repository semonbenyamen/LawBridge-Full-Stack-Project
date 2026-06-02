import React from "react";
import styles from "./SkeletonCard.module.css"

// SkeletonCard — Shared Component

function SkeletonCard() {
    return (
        <div className={styles.card}>
            <div className={styles.avatar}></div>
            <div className={styles.lineL} style={{ width: "65%" }}></div>
            <div className={styles.lineS} style={{ width: "45%" }}></div>
            <div className={styles.lineM} style={{ width: "55%" }}></div>
            <div className={styles.btn}></div>
        </div>
    );
}

export default SkeletonCard;