import type { CalendarViewProps } from "../../../types/CalendarViewProps";
import "../../../styles/MonthView.css";
import type { CalendarEvent } from "../../../types/CalendarEvent";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarDay {
    date: Date;
    events: CalendarEvent[];
}

function MonthView({ currentDate, events }: CalendarViewProps) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const startDay = firstDayOfMonth.getDay();

    const calendarStartDate = new Date(year, month, 1 - startDay);


    const days: CalendarDay[] = Array.from(
        { length: 35 },
        (_, index) => {

            const date = new Date(calendarStartDate);

            date.setDate(calendarStartDate.getDate() + index);

            const dayEvents = events.filter((event) => {

                return (
                    event.startDate.getDate() === date.getDate() &&
                    event.startDate.getMonth() === date.getMonth() &&
                    event.startDate.getFullYear() === date.getFullYear()
                );
            });

            return {
                date,
                events: dayEvents,
            };
        }
    );

    const handleMoreClick = () => {
        alert("Show more events for this day");
    }

    const handleDayClick = () => {
        alert("Day clicked");
    }

    events.push(
        {
            user: "123",
            title: "Team Meeting",
            description: "Discuss project updates",
            startDate: new Date(currentDate),
            endDate: new Date(currentDate.getTime() + 2 * 60 * 60 * 1000),
            allDay: false,
            color: "#4b8bbe",
            recurrence: {
                frequency: "weekly",
                interval: 1,
                until: new Date("2024-12-31T23:59:59"),
            },
        } 
    );

    return (
        <div className="month-view-card">
            <div className="month-view-header">
                {daysOfWeek.map((day) => (
                    <div key={day} className="day-of-week">
                        {day}
                    </div>
                ))}
            </div>
            <div className="month-view-grid">
                {days.map((day) => {
                    const isCurrentMonth = day.date.getMonth() === currentDate.getMonth();
                    const today = new Date();
                    const isToday =
                        day.date.getDate() === today.getDate() &&
                        day.date.getMonth() === today.getMonth() &&
                        day.date.getFullYear() === today.getFullYear();
                    return (
                        <div key={day.date.toISOString()} className="month-view-day" > 
                            <div className="month-day-header" onClick={handleDayClick}>  
                                <div
                                    className={`
                                        ${isCurrentMonth ? "date-number" : "date-number outside-month"}
                                        ${isToday ? "today" : ""}
                                    `}
                                >
                                    {day.date.getDate()}
                                </div>
                            </div>
                            <div className="month-day-events">
                                {day.events.slice(0, 4).map((event, index) => (
                                    <div
                                        key={index}
                                        className="month-day-event"
                                        style={{ backgroundColor: event.color }}
                                    >
                                        {event.title}
                                    </div>
                                ))}

                                {day.events.length > 4 && (
                                    <div className="month-day-more" onClick={handleMoreClick}>
                                        +{day.events.length - 4} more
                                    </div>
                                )}

                            </div>

                        </div>
                    );
                })}
            </div>


        </div>
    );
}

export default MonthView;

/*
            <h1>
                {currentDate.toLocaleDateString("fr-CA", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })}
            </h1>
            */