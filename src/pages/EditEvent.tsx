import { useNavigate } from "react-router-dom";
import type { CalendarEvent } from "../types/CalendarEvent";
import { getEventById } from "../services/eventService";
import { ApiError } from "../services/api";
import { useEffect, useState } from "react";

import "../styles/EditEvent.css";

interface EditEventProps {
    email: string | null;
    onLogout: () => void;
}

export function EditEvent(editEventProps: EditEventProps) {
    const navigate = useNavigate();

    const pageType = window.location.pathname.includes("/copy/")
        ? "copy"
        : "edit";

    const eventId = window.location.pathname.split("/").pop() || "";

    const [event, setEvent] = useState<CalendarEvent | null>(null);

    const logoutAndReturnToLogin = () => {
        localStorage.removeItem("token");
        editEventProps.onLogout();
        navigate("/", { replace: true });
    };

    const handleApiError = (error: unknown, message: string) => {
        if (error instanceof ApiError && error.status === 401) {
            console.error("Unauthorized. Logging out:", error);
            logoutAndReturnToLogin();
            return;
        }

        console.error(message, error);
    };

    useEffect(() => {
        const getEventDetails = async () => {
            try {
                const data = await getEventById(eventId);

                const eventData: CalendarEvent = {
                    ...data.event,
                    startDate: new Date(data.event.startDate),
                    endDate: new Date(data.event.endDate),
                    recurrence: {
                        ...data.event.recurrence,
                        firstOccurence: data.event.recurrence.firstOccurence
                            ? new Date(data.event.recurrence.firstOccurence)
                            : undefined,
                        until: data.event.recurrence.until
                            ? new Date(data.event.recurrence.until)
                            : undefined,
                    },
                };

                setEvent(eventData);
            } catch (error) {
                handleApiError(error, "Failed to fetch event details");
            }
        };

        if (eventId) {
            getEventDetails();
        }
    }, [eventId]);

    return (
        <div className="edit-event-page">
            <div className="edit-event-card">
                <div className="edit-event-header">
                    <h1>{pageType === "copy" ? "Copy event" : "Edit event"}</h1>

                    <button
                        className="edit-event-close-button"
                        onClick={() => navigate(-1)}
                    >
                        ×
                    </button>
                </div>

                {!event ? (
                    <p>Loading event...</p>
                ) : (
                    <form className="edit-event-form">
                        <input
                            className="edit-event-title"
                            value={event.title}
                            onChange={(e) =>
                                setEvent({ ...event, title: e.target.value })
                            }
                            placeholder="Event title"
                        />

                        <div className="edit-event-row">
                            <label>Date</label>
                            <input
                                type="date"
                                value={event.startDate.toISOString().split("T")[0]}
                                onChange={(e) => {
                                    const newDate = new Date(e.target.value);
                                    setEvent({
                                        ...event,
                                        startDate: newDate,
                                    });
                                }}
                            />
                        </div>

                        <div className="edit-event-row">
                            <label>Start</label>
                            <input
                                type="time"
                                value={event.startDate.toTimeString().slice(0, 5)}
                            />

                            <label>End</label>
                            <input
                                type="time"
                                value={event.endDate.toTimeString().slice(0, 5)}
                            />
                        </div>

                        <div className="edit-event-row">
                            <label>All day</label>
                            <input
                                type="checkbox"
                                checked={event.allDay}
                                onChange={(e) =>
                                    setEvent({ ...event, allDay: e.target.checked })
                                }
                            />
                        </div>

                        <div className="edit-event-row">
                            <label>Color</label>
                            <input
                                type="color"
                                value={event.color}
                                onChange={(e) =>
                                    setEvent({ ...event, color: e.target.value })
                                }
                            />
                        </div>

                        <div className="edit-event-row">
                            <label>Recurrence</label>
                            <select
                                value={event.recurrence.frequency}
                                onChange={(e) =>
                                    setEvent({
                                        ...event,
                                        recurrence: {
                                            ...event.recurrence,
                                            frequency: e.target.value as CalendarEvent["recurrence"]["frequency"],
                                        },
                                    })
                                }
                            >
                                <option value="none">Does not repeat</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </div>

                        <textarea
                            className="edit-event-description"
                            value={event.description}
                            onChange={(e) =>
                                setEvent({ ...event, description: e.target.value })
                            }
                            placeholder="Description"
                        />

                        <div className="edit-event-actions">
                            <button
                                type="button"
                                className="edit-event-cancel"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="edit-event-save"
                            >
                                {pageType === "copy" ? "Create copy" : "Save"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}