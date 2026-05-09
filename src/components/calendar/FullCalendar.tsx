import "../../styles/FullCalendar.css";
import type { CalendarEvent } from "../../types/CalendarEvent";
import DayView from "./views/DayView";
import MonthView from "./views/MonthView"
import WeekView from "./views/WeekView";

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
                {view === "week" && (
                    <WeekView 
                        currentDate={currentDate}
                        events={events}
                    />
                )}
                    
                {view === "day" && (
                    <DayView 
                        currentDate={currentDate}
                        events={events}
                    />
                )}
            </div>
        </div>

    );

}

export default FullCalendar;