import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import styles from "./Login.module.css";


function Login() {

// States  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

// Show & Hide Password
const [showPassword, setShowPassword] = useState(false);

// Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({email, password});
  };

  return(
  // loginContainer  
    <div className={styles.container}>
      <div className={styles.card}>

  {/* Logo  */}
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>
            <i className="fa-solid fa-scale-balanced"></i>
          </div>

          <h2>Law<span>Bridge</span></h2>
          <p>Connecting clients with trusted legal experts</p>
        </div>

  {/* Header */}
        <div className={styles.header}>
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>

  {/* Form */}
        <form onSubmit={handleSubmit}>
  {/* Email */}
          <div className={styles.group}>
            <label>Email Address</label>
            <input 
            type="email"
            className={styles.input}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
          </div>
  {/* Password */}
          <div className={styles.group}>
            <label>Password</label>
            
            {/* <div className={styles.passwordHeader}>
              
              
            </div> */}

            <div className={styles.passwordWrapper}>
              <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />

              <button type="button" 
              className={styles.eyeBtn}
              onClick={() => setShowPassword(!showPassword)}>
                { showPassword ? <FaEyeSlash /> : <FaEye /> }
                </button>
            </div>

            <Link to="/forgot-password" className={styles.forgot}>Forgot Password?</Link>
            
          </div>

          <button type="submit" className={styles.btn}>Sign In</button>
        </form>
  {/* Divider  */}
        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <button className={styles.googleBtn}>
          <i className="fa-brands fa-google"></i>Continue with Google</button>

        <div className={styles.footerText}>
          <span>Don’t have an account?</span>
          <Link to="/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;