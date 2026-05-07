import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import "../styles/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();

            console.log(data);
            localStorage.setItem("token", data.token);
            navigate("/calendar");
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-title-container">
                    <h1 className="login-title">
                        Sign in
                    </h1>
                    <h1 className="login-subtitle">
                        to continue to your Calendar
                    </h1>
                </div>

                <div className="login-content">
                    <form onSubmit={handleSubmit} className="login-form"> 
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
                        <button type="submit" className="form-button">
                            Login
                        </button>
                    </form>
                    <Link className="form-link" to="/register">
                        Don't have an account? Register here.
                    </Link>
                </div>
            </div>
                
        </div>

        
    )
}

export default Login
