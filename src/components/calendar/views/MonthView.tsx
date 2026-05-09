import type { CalendarEvent } from "../../../types/CalendarEvent";

function MonthView() {

    const fakeEvents: CalendarEvent[] = [
        {
            user: "123",

            title: "Team Meeting",

            description: "Discuss project updates",

            startDate: new Date("2024-07-01T10:00:00"),

            endDate: new Date("2024-07-01T11:00:00"),

            allDay: false,

            color: "#FF5733",

            recurrence: {
                frequency: "weekly",

                interval: 1,

                until: new Date("2024-12-31T23:59:59"),
            },
        },
    ];

    return (
        <div>
            {fakeEvents[0].title}
        </div>
    );
}

export default MonthView;