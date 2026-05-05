import { useState } from "react";
import { Link } from "react-router-dom";
function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
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