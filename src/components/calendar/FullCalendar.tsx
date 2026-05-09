import "../../styles/FullCalendar.css";
import MonthView from "./views/MonthView"

type CalendarView = "month" | "week" | "day";

type FullCalendarProps = {
    view: CalendarView;
    currentDate: Date;
};

function FullCalendar({ view, currentDate }: FullCalendarProps) {

    return (
        <div className="fullCalendar-card">
            <div className="fullCalendar-calendar">
                {view === "month" && (
                    <MonthView/>
                )}
                {view === "week" && <h1>Week view</h1>}
                {view === "day" && <h1>Day view</h1>}

                <p>{currentDate.toDateString()}</p>
            </div>
        </div>

    );

}

export default FullCalendar;