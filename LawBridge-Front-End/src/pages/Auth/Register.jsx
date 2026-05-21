import React, {useState} from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaBriefcase, FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import styles from "./Register.module.css";


function Register() {
    const [role, setRole] = useState("lawyer");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [lawyerCard, setLawyerCard] = useState(null);

// Storing form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

// When user types a character: stored in the state.
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        console.log(lawyerCard);
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
            {/*When user types the state will updated */}
                <div className={styles.nameRow}>
                    <div className={styles.group}>
                        <label>First Name</label>
                        <input type="text"
                        name="firstName"
                        placeholder="First name"
                        className={styles.input}
                        value={formData.firstName}
                        onChange={handleChange} />
                    </div>

                    <div className={styles.group}>
                        <label>Last Name</label>
                        <input type="text"
                        name="lastName"
                        placeholder="Last name"
                        className={styles.input}
                        value={formData.lastName}
                        onChange={handleChange} />
                    </div>
                </div>

        {/* Email */}
                <div className={styles.group}>
                    <label>Email Address</label>
                    <input type="text"
                    name="email"
                    placeholder="Enter your email"
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}/>
                </div>

        {/* Phone */}
                <div className={styles.group}>
                    <label>Phone Number</label>
                    <input type="text"
                    name="phone"
                    placeholder="+20 100 123 4567"
                    className={styles.input}
                    value={formData.phone}
                    onChange={handleChange} />
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

        {/* When user Upload an image stores it in lawyerCard */}
                            <label htmlFor="fileUpload" className={styles.customUpload}>Choose File</label>
                            <input 
                            id="fileUpload"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            className={styles.hiddenInput}
                            onChange={(e) => setLawyerCard(e.target.files[0])} />

                            {lawyerCard  && (
                                <small className={styles.fileName}>{lawyerCard.name}</small>
                            )}
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
                        name="password"
                        placeholder="Create a password"
                        className={styles.input}
                        value={formData.password}
                        onChange={handleChange} />

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
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        className={styles.input}
                        value={formData.confirmPassword}
                         onChange={handleChange}/>

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