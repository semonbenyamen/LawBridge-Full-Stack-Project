import React, { useState } from "react";
import styles from "./ProfileSetup.module.css";

function Step1BasicInfo({ formData, handleChange, setFormData, nextStep }) {

// Local State to display the image preview immediately
    const [imagePreview, setImagePreview] = useState(
        formData.profilePhoto ? URL.createObjectURL(formData.profilePhoto) : null
    );

// List of available majors
    const specializationsList = ["Criminal", "Civil", "Corporate", "Family", "Labor"];

// Function for handling uploading a personal image
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, profilePhoto: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

// Function for handling additional specializations (Checkboxes)
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        let updatedSpecs = [...formData.additionalSpecializations];

        if (checked) {
            updatedSpecs.push(value);
        } else {
            updatedSpecs = updatedSpecs.filter((spec) => spec !== value);
        }

        setFormData((prev) => ({ ...prev, additionalSpecializations: updatedSpecs }));
    };

    
// Handle form submission for this step to trigger moving forward
    const handleNext = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <form onSubmit={handleNext}>
        {/*Upload profile picture*/}
            <div className={styles.photoUploadContainer}>
                {imagePreview ? (
                    <img src={imagePreview} alt="Profile Preview" className={styles.avatarPreview} />
                ) : (
                    <div className={`${styles.avatarPreview} ${styles.avatarPreview} ${styles.noPhotoFallback}`}>No Photo</div>
        )}
            
            <label className={styles.uploadBtn}>Upload Profile Photo
            <input 
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={styles.hiddenFileInput}
            />
            </label>
            </div>


        {/* Full name */}
            <div className={styles.group}>
                <label>Full Name</label>
                <input 
                    type="text"
                    name="fullName"
                    className={styles.input}
                    placeholder="Enter Your Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
            </div>

        {/* Main specialization */}
            <div className={styles.group}>
                <label>Primary Specialization</label>
                <select 
                    name="primarySpecialization"
                    className={styles.input}
                    value={formData.primarySpecialization}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select your main specialization</option>
                    <option value="Criminal">Criminal Law</option>
                    <option value="Civil">Civil Law</option>
                    <option value="Corporate">Corporate & Business Law</option>
                    <option value="Family">Family & Divorce Law</option>
                    <option value="Labor">Labor & Employment Law</option>
                </select>
            </div>

        {/* Additional specializations */}
            <div className={styles.group}>
                <label>Additional Specializations (Optional)</label>
                <div className={styles.checkboxGrid}>
                    {specializationsList
                        .filter((spec) => spec !== formData.primarySpecialization)
                        .map((spec) => (
                            <label key={spec} className={styles.checkboxLabel}>
                                <input 
                                    type="checkbox"
                                    value={spec}
                                    checked={formData.additionalSpecializations.includes(spec)}
                                    onChange={handleCheckboxChange}
                                />
                                {spec} Law
                            </label>
                        ))
                    }
                </div>
            </div>

        {/* Years of experience */}
            <div className={styles.group}>
                <label>Years of Experience</label>
                <input
                    type="number"
                    name="yearsOfExperience"
                    className={styles.input}
                    placeholder="e.g., 5"
                    min="0"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    required
                />
            </div>

        {/* Introduction */}
            <div className={styles.group}>
                <label>Brief Bio</label>
                <textarea
                    name="bio"
                    className={styles.textarea}
                    placeholder="Write a short paragraph about your expertise..."
                    rows="4"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>

            <button type="submit" className={styles.primaryBtn}>Go to Step 2</button>
        </form>
    );
}

export default Step1BasicInfo;