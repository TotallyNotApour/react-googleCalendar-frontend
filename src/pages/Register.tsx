import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
        <div>
            <div>
                <h1>Register</h1>
                
                <form onSubmit={handleSubmit}> 
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <br/>

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    <br />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <br />

                    <button type="submit">Register</button>
                </form>
            </div>
            <div>
                <Link to="/">have an account? Register here.</Link>
            </div>
        </div>
    )
}

export default Register