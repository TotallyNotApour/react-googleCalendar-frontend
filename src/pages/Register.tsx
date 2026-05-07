import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error("Register failed", { cause: await response.text() });
            }

            const data = await response.json();

            console.log(data);
            localStorage.setItem("token", data.token);
            navigate("/calendar");

        } catch (error) {
            console.error("Register failed:", error);
        }
    }

    return (
        <div className="register-page">
            <div className="register-card">

                <h1 className="register-title">Create a new Account</h1>
                
                <div className="login-content">
                    <form onSubmit={handleSubmit} className="register-form"> 
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="register-button">
                            Register
                        </button>
                    </form>
                    <Link className="register-link" to="/">Have an account? Login here.</Link>
                </div>
            </div>
        </div>
    )
}

export default Register