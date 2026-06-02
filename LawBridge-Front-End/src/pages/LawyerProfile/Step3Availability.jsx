import React from "react";
import styles from "./ProfileSetup.module.css";

function Step3Availability({ formData, handleChange, setFormData, prevStep, handleSubmit }) {
    
    const daysList = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const handleDayToggle = (e) => {
        const { value, checked } = e.target;
        let updatedDays = [...formData.workingDays];

        if (checked) {
            updatedDays.push(value);
        } else {
            updatedDays = updatedDays.filter((day) => day !== value);
        }
        setFormData((prev) => ({ ...prev, workingDays: updatedDays }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.group}>
                <label>Working Days</label>
                <div className={styles.checkboxGrid}>
                    {daysList.map((day) => (
                        <label key={day} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                value={day}
                                checked={formData.workingDays.includes(day)}
                                onChange={handleDayToggle}
                            />
                            {day}
                        </label>
                    ))}
                </div>
            </div>



            <div className={styles.rowGroup}>
                <div className={styles.group}>
                    <label>Start Time</label>
                    <input
                        type="time"
                        name="startTime"
                        className={styles.input}
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div className={styles.group}>
                    <label>End Time</label>
                    <input
                        type="time"
                        name="endTime"
                        className={styles.input}
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>



            <div className={styles.rowGroup}>
                <div className={styles.group}>
                    <label>Consultation Duration</label>
                    <select
                        name="appointmentDuration"
                        className={styles.input}
                        value={formData.appointmentDuration}
                        onChange={handleChange}
                        required
                    >
                        {/* <option value={15}>15 Minutes</option> */}
                        <option value={30}>30 Minutes</option>
                        {/* <option value={45}>45 Minutes</option> */}
                        <option value={60}>60 Minutes</option>
                        <option value={90}>90 Minutes</option>
                    </select>
                </div>


                <div className={styles.group}>
                    <label>Consultation Fee (EGP)</label>
                    <input
                        type="number"
                        name="consultationFee"
                        className={styles.input}
                        placeholder="e.g., 300"
                        min={0}
                        value={formData.consultationFee}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>


            <div className={styles.buttonContainer}>
                <button type="button" className={styles.secondaryBtn} onClick={prevStep}>Back</button>
                <button type="submit" className={styles.submitBtn}>Submit Form</button>
            </div>
        </form>
    );
}

export default Step3Availability;