import type { CalendarEvent } from "./CalendarEvent";

export interface CalendarViewProps {
    currentDate: Date;
    events: CalendarEvent[];
    onOpenCreateModal: (date: Date) => void;
    openEventDetails: (event: CalendarEvent, anchorEl: HTMLElement | null) => void;
}
