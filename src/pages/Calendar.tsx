import "../styles/Calendar.css";
import Sidebar from "../components/sidebar/Sidebar"
import FullCalendar from "../components/calendar/FullCalendar"
import Taskbar from "../components/taskbar/Taskbar"
import type {CalendarEvent} from "../types/CalendarEvent"
import { getDateRange } from "../utils/GetRangeDate"
import CreateEventModal from "../components/createEventModal/CreateEventModal";


import { useEffect, useState  } from "react";
import { createEvent, getEventsByDateRange } from "../services/eventService";

interface CalendarProps {
    email: string | null;
}
type CalendarView = "month" | "week" | "day";

function Calendar(calendarProps: CalendarProps) {
    const [view, setView] = useState<CalendarView>("month");
    const [currentDate, setCurrentDate] = useState(new Date())
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createEventDate, setCreateEventDate] = useState(currentDate);

    const openCreateModal = (date: Date = currentDate) => {
        if (isCreateModalOpen) return;

        setCreateEventDate(date);
        setIsCreateModalOpen(true);
    };

    const moveCalendarDate = (direction: "next" | "previous") => {
        setCurrentDate((previousDate) => {
            const newDate = new Date(previousDate);

            if (view === "month") {
                newDate.setDate(1);
                newDate.setMonth(
                    newDate.getMonth() + (direction === "next" ? 1 : -1)
                );
            } else if (view === "week") {
                newDate.setDate(
                    newDate.getDate() + (direction === "next" ? 7 : -7)
                );
            } else if (view === "day") {
                newDate.setDate(
                    newDate.getDate() + (direction === "next" ? 1 : -1)
                );
            }

            return newDate;
        });
        
    };

    const refreshEvents = async () => {
        try {
            const { start, end } = getDateRange(currentDate, view);
            const data = await getEventsByDateRange(start, end);

            const eventsData: CalendarEvent[] = data.fullEvents.map((event: CalendarEvent) => ({
                ...event,
                startDate: new Date(event.startDate),
                endDate: new Date(event.endDate),
                recurrence: {
                    ...event.recurrence,
                    firstOccurence: event.recurrence.firstOccurence
                        ? new Date(event.recurrence.firstOccurence)
                        : undefined,
                    until: event.recurrence.until
                        ? new Date(event.recurrence.until)
                        : undefined,
                },
            }));

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
                    moveCalendarDate={moveCalendarDate}
                />
            </div>

            <div className="calendar-content">
                < Sidebar 
                    view={view} 
                    currentDate={currentDate}
                    setCurrentDate={setCurrentDate}
                    onOpenCreateModal={() => openCreateModal()}
                />

                < FullCalendar 
                    view={view}
                    currentDate={currentDate} 
                    events={events} 
                    onOpenCreateModal={() => openCreateModal()}
                    moveCalendarDate={moveCalendarDate}
                />
            </div>

            {isCreateModalOpen && (
                <CreateEventModal
                    currentDate={createEventDate}
                    onClose={() => setIsCreateModalOpen(false)}
                    onCreateEvent={handleCreateEvent}
                />
            )}
        </div>
    )
}


export default Calendar