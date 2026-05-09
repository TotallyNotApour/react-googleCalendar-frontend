import "../../styles/FullCalendar.css";
import type { CalendarEvent } from "../../types/CalendarEvent";

import MonthView from "./views/MonthView"

type CalendarView = "month" | "week" | "day";

type FullCalendarProps = {
    view: CalendarView;
    currentDate: Date;
    events: CalendarEvent[];
};

function FullCalendar({ view, currentDate, events }: FullCalendarProps) {

    return (
        <div className="fullCalendar-card">
            <div className="fullCalendar-calendar">
                {view === "month" && (
                    <MonthView 
                        currentDate={currentDate}
                        events={events}
                    />
                )}
                {view === "week" && <h1>Week view</h1>}
                {view === "day" && <h1>Day view</h1>}
            </div>
        </div>

    );

}

export default FullCalendar;