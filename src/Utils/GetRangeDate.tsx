type CalendarView = "month" | "week" | "day";

export function getDateRange(currentDate: Date, view: CalendarView) {
    const start = new Date(currentDate);
    const end = new Date(currentDate);

    if (view === "month") {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const startDay = firstDayOfMonth.getDay();

        start.setFullYear(year, month, 1 - startDay);
        start.setHours(0, 0, 0, 0);

        end.setTime(start.getTime());
        end.setDate(end.getDate() + 42);
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