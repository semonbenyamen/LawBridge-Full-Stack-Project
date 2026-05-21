import React, {useState} from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaBriefcase, FaCloudUploadAlt } from "react-icons/fa";
import styles from "./Register.module.css";


function Register() {
    const [role, setRole] = useState("lawyer");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Register Submitted");
    };

    return(
        <div className={styles.container}>
            <div className={styles.card}>

        {/* Logo */}
                <div className={styles.logoSection}>
                    <div className={styles.logoIcon}>
                        <i className="fa-solid fa-scale-balanced"></i>
                    </div>

                    <h2>Law<span>Bridge</span></h2>

                    <h1>Create Your Account</h1>
                    <p>Join LawBridge today</p>
                </div>

        {/* Role Selection */}
                <div className={styles.roleSection}>
                    <p>I want to register as</p>
                    <div className={styles.roles}>
                        <div className={`${styles.roleCard} ${role === "client" ? styles.active : ""}`}
                        onClick={() => setRole("client")}>
                        <FaUser/>
                        <h3>Client</h3>
                        <span>Find & book a lawyer</span>
                    </div>

                    <div className={`${styles.roleCard} ${role === "lawyer" ? styles.active : "" }`}
                    onClick={() => setRole("lawyer")}>
                        <FaBriefcase/>
                        <h3>Lawyer</h3>
                        <span>Receive clients</span>
                    </div>
                </div>
                </div>
            

        {/* Form */}
            <form onSubmit={handleSubmit}>

        {/* Names */}
                <div className={styles.nameRow}>
                    <div className={styles.group}>
                        <label>First Name</label>
                        <input type="text"
                        placeholder="First name"
                        className={styles.input} />
                    </div>

                    <div className={styles.group}>
                        <label>Last Name</label>
                        <input type="text"
                        placeholder="Last name"
                        className={styles.input} />
                    </div>
                </div>

        {/* Email */}
                <div className={styles.group}>
                    <label>Email Address</label>
                    <input type="text"
                    placeholder="Enter your email"
                    className={styles.input} />
                </div>

        {/* Phone */}
                <div className={styles.group}>
                    <label>Phone Number</label>
                    <input type="text"
                    placeholder="+20 100 123 4567"
                    className={styles.input} />
                </div>

        {/* Lawyer Upload */}
                {role === "lawyer" && (
                    <div className={styles.group}>
                        <label>Lawyer ID Card *</label>

                        <div className={styles.uploadBox}>
                            <FaCloudUploadAlt className={styles.uploadIcon}/>

                            <p>Drag & drop your ID card here</p>
                            <span>or browse files</span>
                            <small>Accepted: jpg, jpeg, png</small>
                        </div>

                        <div className={styles.note}>
                            Lawyers must upload a valid lawyer card for account verification.
                        </div>
                    </div>
                )}

        {/* Password */}
                <div className={styles.group}>
                    <label>Password</label>
                    <div className={styles.passwordWrapper}>
                        <input type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className={styles.input} />

                        <button type="button"
                        className={styles.eyeBtn}
                        onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash/> : <FaEye/>}
                            </button>
                    </div>
                </div>

        {/* Confirm Password */}
                <div className={styles.group}>
                    <label>Confirm Password</label>
                    <div className={styles.passwordWrapper}>
                        <input type= {showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className={styles.input}/>

                        <button type="button"
                        className={styles.eyeBtn}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

        {/* Submit */}
                <button type="submit" className={styles.btn}>Create Account</button>

            </form>

        {/* Footer  */}
            <div className={styles.footerText}>
                <span>Already have an account?</span>
                <Link to="/login">Sign In</Link>
            </div>
        </div>
        </div>
    );
}

export default Register;