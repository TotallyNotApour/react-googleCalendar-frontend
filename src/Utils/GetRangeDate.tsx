type CalendarView = "month" | "week" | "day";

export function getDateRange(currentDate: Date, view: CalendarView) {
    const start = new Date(currentDate);
    const end = new Date(currentDate);

    if (view === "month") {
        start.setDate(1);
        start.setHours(0, 0, 0, 0);

        end.setDate(1);
        end.setMonth(end.getMonth() + 1);
        end.setHours(0, 0, 0, 0);
    }

    if (view === "week") {
        const day = start.getDay();

        start.setDate(start.getDate() - day);
        start.setHours(0, 0, 0, 0);

        end.setTime(start.getTime());
        end.setDate(end.getDate() + 7);
    }

    if (view === "day") {
        start.setHours(0, 0, 0, 0);

        end.setTime(start.getTime());
        end.setDate(end.getDate() + 1);
    }

    return { start, end };
}