import "../styles/Calendar.css";
import Sidebar from "../components/sidebar/Sidebar"
import FullCalendar from "../components/calendar/FullCalendar"
import Taskbar from "../components/taskbar/Taskbar"
import type {CalendarEvent} from "../types/CalendarEvent"
import { getDateRange } from "../utils/GetRangeDate"
import CreateEventModal from "../components/createEventModal/CreateEventModal";


import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../services/api";
import { createEvent, getEventsByDateRange } from "../services/eventService";
import { DetailEventModal } from "../components/detailEventModal/DetailEventModal";

interface CalendarProps {
    email: string | null;
    onLogout: () => void;
}
type CalendarView = "month" | "week" | "day";

function Calendar(calendarProps: CalendarProps) {
    const navigate = useNavigate();
    const [view, setView] = useState<CalendarView>("month");
    const [currentDate, setCurrentDate] = useState(new Date())
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createEventDate, setCreateEventDate] = useState(currentDate);

    const [isOpenEventDetails, setIsOpenEventDetails] = useState(false);
    const [openEventDetails, setOpenEventDetails] = useState<CalendarEvent | null>(null);


    const openCreateModal = (date: Date) => {
        if (isCreateModalOpen) return;

        setCreateEventDate(date);
        setIsCreateModalOpen(true);
    };

    const handleOpenEventDetails = (event: CalendarEvent) => {
        console.log("Opening event details for:", event);

        setOpenEventDetails(event);
        setIsOpenEventDetails(true);
    };

    const logoutAndReturnToLogin = () => {
        localStorage.removeItem("token");
        calendarProps.onLogout();
        navigate("/", { replace: true });
    };

    const handleApiError = (error: unknown, message: string) => {
        if (error instanceof ApiError && error.status === 401) {
            console.error("Unauthorized. Logging out:", error);
            logoutAndReturnToLogin();
            return;
        }

        console.error(message, error);
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
            handleApiError(error, "Failed to refresh events:");
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
            handleApiError(error, "Failed to create event:");
        }
    };

    const handleDeleteEvent = async (id: string) => {
        console.log("Deleting event with ID:", id);
    };

    const handleUpdateEvent = async (updatedEvent: CalendarEvent) => {
        console.log("Updating event:", updatedEvent);
    };

    const handleCopyEvent = async (eventToCopy: CalendarEvent) => {
        console.log("Copying event:", eventToCopy);
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
                    onOpenCreateModal={openCreateModal}
                />

                < FullCalendar 
                    view={view}
                    currentDate={currentDate} 
                    events={events} 
                    onOpenCreateModal={openCreateModal}
                    moveCalendarDate={moveCalendarDate}
                    openEventDetails={handleOpenEventDetails}
                />
            </div>

            {isCreateModalOpen && (
                <CreateEventModal
                    currentDate={createEventDate}
                    onClose={() => setIsCreateModalOpen(false)}
                    onCreateEvent={handleCreateEvent}
                />
            )}

            {isOpenEventDetails && (
                <DetailEventModal
                    onClose={() => setIsOpenEventDetails(false)}
                    onDelete={handleDeleteEvent}
                    onUpdate={handleUpdateEvent}
                    onCopy={handleCopyEvent}
                    event={openEventDetails}
                />
            )}
        </div>
    )
}


export default Calendar
