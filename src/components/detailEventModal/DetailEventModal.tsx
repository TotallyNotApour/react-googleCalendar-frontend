import type { CalendarEvent } from "../../types/CalendarEvent";



interface DetailEventModalProps {
    event: CalendarEvent | null;
    onClose: () => void;
    onDelete: (id: string) => Promise<void>;
    onUpdate: (updatedEvent: CalendarEvent) => Promise<void>;
    onCopy: (eventToCopy: CalendarEvent) => Promise<void>;
}

export function DetailEventModal({ event, onClose, onDelete, onUpdate, onCopy }: DetailEventModalProps) {


    return (

    );
}
