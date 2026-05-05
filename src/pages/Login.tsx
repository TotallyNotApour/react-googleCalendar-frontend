import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
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