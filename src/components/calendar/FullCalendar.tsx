import "../../styles/FullCalendar.css";
import type { CalendarEvent } from "../../types/CalendarEvent";
import DayView from "./views/DayView";
import MonthView from "./views/MonthView"
import WeekView from "./views/WeekView";
import { useRef } from "react";


type CalendarView = "month" | "week" | "day";

type FullCalendarProps = {
    view: CalendarView;
    currentDate: Date;
    events: CalendarEvent[];
    onOpenCreateModal: (date: Date) => void;
    moveCalendarDate: (direction: "next" | "previous") => void;
    openEventDetails: (event: CalendarEvent) => void;
};

function FullCalendar({ view, currentDate, events, onOpenCreateModal, moveCalendarDate, openEventDetails }: FullCalendarProps) {
    
    const wheelCooldownRef = useRef(false);
    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        if (wheelCooldownRef.current) return;
        if (Math.abs(event.deltaY) < 20) return;

        wheelCooldownRef.current = true;

        if (event.deltaY > 0) {
            moveCalendarDate("next");
        } else {
            moveCalendarDate("previous");
        }

        window.setTimeout(() => {
            wheelCooldownRef.current = false;
        }, 100);
    };

    return (
        <div className="fullCalendar-card" onWheel={handleWheel}>
            <div className="fullCalendar-calendar">
                {view === "month" && (
                    <MonthView 
                        currentDate={currentDate}
                        events={events}
                        onOpenCreateModal={onOpenCreateModal}
                        openEventDetails={openEventDetails}
                    />
                )}
                {view === "week" && (
                    <WeekView 
                        currentDate={currentDate}
                        events={events}
                        onOpenCreateModal={onOpenCreateModal}
                        openEventDetails={openEventDetails}
                    />
                )}
                    
                {view === "day" && (
                    <DayView 
                        currentDate={currentDate}
                        events={events}
                        onOpenCreateModal={onOpenCreateModal}
                        openEventDetails={openEventDetails}
                    />
                )}
            </div>
        </div>

    );

}

export default FullCalendar;