import type { CalendarViewProps } from "../../../types/CalendarViewProps";

function MonthView({ currentDate, events }: CalendarViewProps) {

    events.push(
        {
            user: "123",

            title: "Team Meeting",

            description: "Discuss project updates",

            startDate: new Date(currentDate),

            endDate: new Date(currentDate.getTime() + 2 * 60 * 60 * 1000),

            allDay: false,

            color: "#FF5733",

            recurrence: {
                frequency: "weekly",

                interval: 1,

                until: new Date("2024-12-31T23:59:59"),
            },
        } 
    );

    return (
        <div>

        </div>
    );
}

export default MonthView;