import type { CalendarEvent } from "./CalendarEvent";

export interface CalendarViewProps {
    currentDate: Date;
    events: CalendarEvent[];
}