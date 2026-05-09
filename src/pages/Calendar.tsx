import { useNavigate } from "react-router-dom";
import "../styles/Calendar.css";
import CalendarSidebar from "../components/calendar/CalendarSidebar"
import FullCalendar from "../components/calendar/FullCalendar"
import Taskbar from "../components/taskbar/Taskbar"
import type {CalendarEvent} from "../types/CalendarEvent"

import { useEffect, useState } from "react";

interface CalendarProps {
    email: string | null;
}
type CalendarView = "month" | "week" | "day";

function Calendar(calendarProps: CalendarProps) {
    const navigate = useNavigate();

    const [view, setView] = useState<CalendarView>("month");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<CalendarEvent[]>([]);

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

    useEffect( () => {
        const fetchEvents = async () => {
            try {
                const { start, end } = getDateRange(currentDate, view);
                const token = localStorage.getItem("token");
                const response = await fetch(
                    `http://localhost:5000/api/events/getByDateRange?start=${start.toISOString()}&end=${end.toISOString()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }

                const data = await response.json();
                setEvents(data.events);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }   
        }
        fetchEvents();
    }, [currentDate, view]);
    
    return (
        <div className="calendar-page">
            <div className="calendar-taskbar">
                <Taskbar
                    email={calendarProps.email}
                    view={view}
                    currentDate={currentDate}
                    setView={setView}
                    setCurrentDate={setCurrentDate}
                />
            </div>

            <div className="calendar-content">
                < CalendarSidebar />

                < FullCalendar view={view} currentDate={currentDate} events={events} />
            </div>
        </div>
    )
}


function getDateRange(currentDate: Date, view: CalendarView) {
    const start = new Date(currentDate);
    const end = new Date(currentDate);

    if (view === "month") {
        start.setDate(1);
        start.setHours(0, 0, 0, 0);

        end.setDate(1);
        end.setMonth(end.getMonth() + 1);
        end.setHours(0, 0, 0, 0);
    }

    if (view === "week") {
        const day = start.getDay();

        start.setDate(start.getDate() - day);
        start.setHours(0, 0, 0, 0);

        end.setTime(start.getTime());
        end.setDate(end.getDate() + 7);
    }

    if (view === "day") {
        start.setHours(0, 0, 0, 0);

        end.setTime(start.getTime());
        end.setDate(end.getDate() + 1);
    }

    return { start, end };
}

export default Calendar