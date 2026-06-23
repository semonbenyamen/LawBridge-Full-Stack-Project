import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./ForgotPassword.module.css";


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log("Reset Email:", email);

        // it just for now before integration
            await new Promise((resolve) => setTimeout(resolve, 800));

            Swal.fire({
                icon: "success",
                title: "Email Sent",
                text: "Check your inbox for the password reset link.",
                confirmButtonColor: "#3F2C2C",
            });

            setEmail("");

        } catch (error) {
             // Shown only when backend integration is connected
            Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text: error.response?.data?.msg || "Please try again later.",
                confirmButtonColor: "#3F2C2C",
        });
    } finally {setLoading(false);       
    }
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
                    <p>Enter your email address and we'll send you a password reset link.</p>
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
 
                    <button type="submit" className={styles.btn} disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
 
                <div className={styles.footer}>
                    <Link to="/login">Back to Login</Link>
                </div>
            </div>
        </div>
    );
}
 
export default ForgotPassword;



// const { useState } = require("react");

// const [email, setEmail] = useState("")