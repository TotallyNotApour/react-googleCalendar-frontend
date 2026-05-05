import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";

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
        <div>
            <div>
                <h1>Login</h1>

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

                    <button type="submit">Login</button>
                </form>
            </div>
            <div>
                <Link to="/register">Don't have an account? Register here.</Link>
            </div>
        </div>

        
    )
}

export default Login