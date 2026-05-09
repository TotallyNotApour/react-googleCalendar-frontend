import { useNavigate } from "react-router-dom";
import "../styles/Calendar.css";
import CalendarSidebar from "../components/calendar/CalendarSidebar"
import FullCalendar from "../components/calendar/FullCalendar"
import Taskbar from "../components/taskbar/Taskbar"

import { useState } from "react";

interface CalendarProps {
    email: string | null;
}
type CalendarView = "month" | "week" | "day";

function Calendar(calendarProps: CalendarProps) {
    
    const [view, setView] = useState<CalendarView>("month");
    const [currentDate, setCurrentDate] = useState(new Date());

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
                <Taskbar
                    email={calendarProps.email}
                    view={view}
                    setView={setView}
                />
            </div>

            <div className="calendar-content">
                < CalendarSidebar />

                < FullCalendar view={view} currentDate={currentDate} />
            </div>
        </div>
    )
}

export default Calendar