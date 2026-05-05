import { useNavigate } from "react-router-dom";

function Calendar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const handleTest = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:5000/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    
    return (
        <div>
            <h1>Calendar Page</h1>
            <button onClick={handleLogout}>
                Logout
            </button>

            <button onClick={handleTest}>
                test
            </button>
        </div>
    )
}

export default Calendar