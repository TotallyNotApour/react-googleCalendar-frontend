import { useNavigate } from "react-router-dom";

function Calendar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }
    return (
        <div>
            <h1>Calendar Page</h1>
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default Calendar