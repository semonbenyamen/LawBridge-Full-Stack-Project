import React, { useState } from "react";
import Step1BasicInfo from "./Step1BasicInfo";
import Step2OfficeDetails from "./Step2OfficeDetails"
import Step3Availability from "./Step3Availability";
import styles from "./ProfileSetup.module.css";

function LawyerProfileSetup() {

// Current step state (1, 2, or 3)
    const [step, setStep] = useState(1);

// Global state holding all data for the 3 steps
    const [formData, setFormData] = useState({
    // Step 1: Basic Info
        fullName: "",
        primarySpecialization: "",
        additionalSpecializations: [],
        profilePhoto: null,
        yearsOfExperience: "",
        bio: "",

    // Step 2: Office Details
        governorate: "",
        district: "",
        officeAddress: "",
        officePhone: "",
        whatsappNumber: "",

    // Step 3: Availability
        workingDays: [],
        startTime: "",
        endTime: "",
        appointmentDuration: 30,
        consultationFee: ""
    });

// Function to handle changes in any input field across all steps
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

// Navigation functions to move between steps
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

// Final submit function to send data to the backend API
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting final data to API: ", formData);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>

                <div className={styles.header}>
                    <h1>Complete Your Profile</h1>
                    <p>Step {step} of 3</p>
                </div>

                {step === 1 && (
                    <Step1BasicInfo
                        formData={formData}
                        handleChange={handleChange}
                        setFormData={setFormData}
                        nextStep={nextStep}
                    />
               )}

               {step === 2 && (
                <Step2OfficeDetails
                    formData={formData}
                    handleChange={handleChange}
                    setFormData={setFormData}
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
               )}

               {step === 3 && (
                <Step3Availability
                    formData={formData}
                    handleChange={handleChange}
                    setFormData={setFormData}
                    prevStep={prevStep}
                    handleSubmit={handleSubmit}
                />
               )}

            </div>
        </div>
    );
} 

export default LawyerProfileSetup;