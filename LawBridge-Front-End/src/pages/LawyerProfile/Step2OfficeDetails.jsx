import React from "react";
import styles from "./ProfileSetup.module.css";

function Step2OfficeDetails({ formData, handleChange, setFormData, nextStep, prevStep }){

const egyptLocations = {
    "Cairo": ["Nasr City", "Maadi", "Heliopolis", "New Cairo", "Downtown", "Zamalek"],
    "Giza": ["Dokki", "Mohandeseen", "Sheikh Zayed", "Haram", "Faisal"],
    "Alexandria": ["Smouha", "Sidi Gaber", "Miami", "Agami", "Mandara"]
};

const handleGovernorateChange = (e) => {
    const selectedGov = e.target.value;
    setFormData((prev) => ({
        ...prev,
        governorate: selectedGov,
        district: ""
    }));
};

const handleNext = (e) => {
    e.preventDefault();
    nextStep();
};

return(
    <form onSubmit={handleNext}>
        <div className={styles.group}>
            <label>Governorate</label>
            <select
                name="governorate"
                className={styles.input}
                value={formData.governorate}
                onChange={handleGovernorateChange}
                required
            >
                <option value="">Select Governorate</option>
                {Object.keys(egyptLocations).map((gov) => (
                    <option key={gov} value={gov}>{gov}</option>
                ))}
            </select>
        </div>


        <div className={styles.group}>
            <label>District / City</label>
            <select
                name="district"
                className={styles.input}
                value={formData.district}
                onChange={handleChange}
                required
                disabled={!formData.governorate}
            >
                <option value="">Select District</option>
                {formData.governorate && egyptLocations[formData.governorate].map((dist) => (
                    <option key={dist} value={dist}>{dist}</option>
                ))}
            </select>
        </div>   


        <div className={styles.group}>
            <label>Detailed Office Address</label>
            <input
                type="text"
                name="officeAddress"
                className={styles.input}
                placeholder="e.g., 10 Talaat Harb St, Floor 3"
                value={formData.officeAddress}
                onChange={handleChange}
                required
            />
        </div>



        <div className={styles.group}>
                <label>Office Phone Number</label>
                <input 
                    type="tel"
                    name="officePhone"
                    className={styles.input}
                    placeholder="e.g., 01012345678"
                    value={formData.officePhone}
                    onChange={handleChange}
                    required
                />
        </div>



        <div className={styles.group}>
                <label>WhatsApp Number</label>
                <input 
                    type="tel"
                    name="whatsappNumber"
                    className={styles.input}
                    placeholder="e.g., 01012345678"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    required
                />
        </div>



        <div className={styles.buttonContainer}>
            <button type="button" className={styles.secondaryBtn} onClick={prevStep}>Back</button>
            <button type="submit" className={styles.primaryBtn}>Go to Step 3</button>
        </div>
    </form>
);
}

export default Step2OfficeDetails;
