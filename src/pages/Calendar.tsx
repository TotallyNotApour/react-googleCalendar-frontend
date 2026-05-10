import { useNavigate } from "react-router-dom";
import "../styles/Calendar.css";
import CalendarSidebar from "../components/sidebar/CalendarSidebar"
import FullCalendar from "../components/calendar/FullCalendar"
import Taskbar from "../components/taskbar/Taskbar"
import type {CalendarEvent} from "../types/CalendarEvent"
import { getDateRange } from "../Utils/GetRangeDate"

import { useEffect, useState } from "react";
import { createEvent, getEventsByDateRange } from "../services/eventService";

interface CalendarProps {
    email: string | null;
}
type CalendarView = "month" | "week" | "day";

function Calendar(calendarProps: CalendarProps) {
    const navigate = useNavigate();

    const [view, setView] = useState<CalendarView>("month");
    const [currentDate, setCurrentDate] = useState(new Date())
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }


    const refreshEvents = async () => {
        try {
            const { start, end } = getDateRange(currentDate, view);
            const data = await getEventsByDateRange(start, end);

            const eventsData: CalendarEvent[] = data.events || [];
            console.log("Fetched events:", eventsData);
            setEvents(eventsData);
        } catch (error) {
            console.error("Failed to refresh events:", error);
        }
    };

    useEffect(() => {
        refreshEvents();
    }, [currentDate, view]);

    const handleCreateEvent = async (newEvent: CalendarEvent) => {
        try {
            await createEvent(newEvent);
            await refreshEvents();
        } catch (error) {
            console.error("Failed to create event:", error);
        }
    };


    
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
                < CalendarSidebar 
                    view={view} 
                    currentDate={currentDate}
                    setCurrentDate={setCurrentDate}
                    onCreateEvent={handleCreateEvent}
                />

                < FullCalendar view={view} currentDate={currentDate} events={events} />
            </div>
        </div>
    )
}


export default Calendar