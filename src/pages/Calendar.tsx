import { useNavigate } from "react-router-dom";
import {Menu, ChevronLeft , ChevronRight, Search } from "lucide-react";
import "../styles/Calendar.css";
import CalendarSidebar from "../components/calendar/CalendarSidebar"


interface CalendarProps {
    email: string | null;
}
function Calendar(calendarProps: CalendarProps) {
    
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
        <div className="calendar-page">
            <div className="calendar-taskbar">
                <Menu className="calendar-menu-icon" />
                <h1 className="calendar-title">My Calendar</h1>

                <button className="calendar-button-today" onClick={() => alert("Go to today")}>
                    Today
                </button>
                <ChevronLeft className="calendar-button-prev" onClick={() => alert("Go to previous month")} />
                <ChevronRight className="calendar-button-next" onClick={() => alert("Go to next month")} />
                <h1 className="calendar-month-year">June 2024</h1>
                <Search className="calendar-search-icon" onClick={() => alert("Search events")} />
                <div className="calendar-profile-icon">
                    <h1 className="calendar-profile-initial">{calendarProps.email?.[0].toLocaleUpperCase() || ''}</h1>
                </div>
            </div>

            <div className="calendar-content">
                < CalendarSidebar />
                <h1 className="calendar-placeholder">Calendar content goes here...</h1>
            </div>
        </div>
    )
}

export default Calendar