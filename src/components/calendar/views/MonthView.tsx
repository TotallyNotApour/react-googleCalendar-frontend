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
        { length: 42 },
        (_, index) => {

            const date = new Date(calendarStartDate);

            date.setDate(calendarStartDate.getDate() + index);

            const dayEvents = events
                .filter((event) => {

                    return (
                        event.startDate.getDate() === date.getDate() &&
                        event.startDate.getMonth() === date.getMonth() &&
                        event.startDate.getFullYear() === date.getFullYear()
                    );
                })

                .sort((a, b) => {

                    // all-day events first
                    if (a.allDay && !b.allDay) return -1;
                    if (!a.allDay && b.allDay) return 1;

                    // then sort by start time
                    return (
                        new Date(a.startDate).getTime() -
                        new Date(b.startDate).getTime()
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
            startDate: new Date(currentDate.getTime() + 2 * 60 * 1000),
            endDate: new Date(currentDate.getTime() + 2 * 60 * 60 * 1000),
            allDay: true,
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
                                {day.events.slice(0, 3).map((event, index) => {
                                    const isPastEvent = event.endDate < new Date();
                                    const isAllDay = event.allDay;
                                    const eventClass = `month-day-event 
                                        ${isPastEvent ? "past-event" : ""} 
                                        ${isAllDay ? "all-day-event" : ""}
                                    `;

                                    return (
                                        <div
                                            key={index}
                                            className={eventClass}

                                            style={
                                                isAllDay
                                                    ? { backgroundColor: event.color }
                                                    : {}
                                            }
                                        >

                                            {!isAllDay && (
                                                <div
                                                    className="month-day-event-dot"

                                                    style={{
                                                        backgroundColor: event.color
                                                    }}
                                                />
                                            )}

                                            {!isAllDay && (
                                                <div className="month-day-event-time">
                                                    {event.startDate.toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </div>
                                            )}

                                            <div className="month-day-event-title">
                                                {event.title}
                                            </div>

                                        </div>
                                    );
                                })}

                                {day.events.length > 3 && (
                                    <div className="month-day-more" onClick={handleMoreClick}>
                                        +{day.events.length - 3} more
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