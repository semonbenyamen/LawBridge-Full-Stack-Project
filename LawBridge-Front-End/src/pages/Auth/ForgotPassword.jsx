import { Link } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import { useState } from "react";

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Reset Email:", email);

        alert("Reset link sent successfully");
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.logoSection}>
                    <div className={styles.logoIcon}>
                        <i className="fa-solid fa-scale-balanced"></i>
                    </div>

                    <h2>Law<span>Bridge</span></h2>
                </div>

                <div className={styles.header}>
                    <h1>Forgot Password</h1>
                    <p> Enter your email address and we'll send you a password reset link.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.group}>
                        <label>Email Address</label>

                        <input 
                            type="email"
                            placeholder="Enter your email"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.btn}>Send Reset Link</button>
                </form>

                <div className={styles.footer}>
                    <Link to="/login">Back to Login</Link>
                </div>
            </div>
        </div>
    );
}


export default ForgotPassword;