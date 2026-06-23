import Swal from "sweetalert2";
import { useState } from "react";
import { useParams } from "react-router-dom";

function ResetPassword() {

    const { token } = useParams();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Passwords do not match"
          });
           return;
        }

        console.log({
            token,
            password,
            confirmPassword
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button type="submit">
                Reset Password
            </button>
        </form>
    );
}

export default ResetPassword;