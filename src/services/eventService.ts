import { apiFetch } from "./api";
import type { CalendarEvent } from "../types/CalendarEvent";

export async function getEventsByDateRange(start: Date, end: Date) {

    const formattedStart = start.toISOString().split("T")[0];
    const formattedEnd = end.toISOString().split("T")[0];

    return apiFetch(
        `/api/events/getByDateRange?start=${formattedStart}&end=${formattedEnd}`
    );
}

export async function getEventById(id: string) {
    return apiFetch(`/api/events/get/${id}`, {
        method: "GET",
    });
}

export async function createEvent(event: CalendarEvent) {
    return apiFetch("/api/events/add", {
        method: "POST",
        body: JSON.stringify(event),
    });
}

export async function deleteEvent(id: string) {
    return apiFetch(`/api/events/delete/${id}`, {
        method: "DELETE",
    });
}