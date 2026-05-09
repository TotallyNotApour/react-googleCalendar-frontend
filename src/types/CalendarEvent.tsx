export interface CalendarEvent {
    _id?: string;
    user: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    allDay: boolean;
    color: string;
    recurrence: {
        frequency: "none" | "daily" | "weekly" | "monthly" | "yearly";
        interval: number;
        firstOccurence?: Date;
        until?: Date;
    };
}