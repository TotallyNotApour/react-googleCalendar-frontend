import Menu from "@mui/material/Menu";
import type { CalendarEvent } from "../../types/CalendarEvent";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {
    Clipboard,
    Pencil,
    Trash,
    X,
    Clock3,
    MapPin,
    Repeat,
    CalendarDays,
} from "lucide-react";

import "../../styles/DetailEventModal.css";

interface DetailEventModalProps {
    event: CalendarEvent | null;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    onDelete: (id: string) => Promise<void>;
    onUpdate: (updatedEvent: CalendarEvent) => Promise<void>;
    onCopy: (eventToCopy: CalendarEvent) => Promise<void>;
}

export function DetailEventModal({
    event,
    anchorEl,
    onClose,
    onDelete,
    onUpdate,
    onCopy
}: DetailEventModalProps) {
    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl && event)}
            onClose={onClose}

            slotProps={{
                paper: {
                    sx: {
                        width: 360,
                        borderRadius: "20px",
                        padding: "18px",
                    },
                },
            }}
        >
            <div className="event-detail-card">

                <div className="event-detail-topbar">

                    <Tooltip title={event?.title || ""}>
                        <div className="event-detail-title">
                            {event?.title}
                        </div>
                    </Tooltip>

                    <div className="event-detail-actions">

                        <Tooltip title="Copy Event">
                            <IconButton
                                size="small"
                                onClick={() => event && onCopy(event)}
                            >
                                <Clipboard size={25} className="event-button"/>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Edit Event">
                            <IconButton
                                size="small"
                                onClick={() => event && onUpdate(event)}
                            >
                                <Pencil size={25} className="event-button"/>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Event">
                            <IconButton
                                size="small"
                                onClick={() => event?._id && onDelete(event._id)}
                            >
                                <Trash size={25} className="event-button"/>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Close">
                            <IconButton
                                size="small"
                                onClick={onClose}
                            >
                                <X size={25} className="event-button"/>
                            </IconButton>
                        </Tooltip>
                        

                    </div>

                </div>

                <div className="event-detail-section">
                    <CalendarDays size={18} className="event-button"/>

                    <span className="event-detail-text">
                        {event?.startDate.toLocaleDateString("fr-CA", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </span>
                </div>

                {!event?.allDay && (
                    <div className="event-detail-section">
                        <Clock3 size={18} className="event-button" />

                        <span className="event-detail-text">
                            {event?.startDate.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                            {" - "}
                            {event?.endDate.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    </div>
                )}

                {event?.location && (
                    <div className="event-detail-section">
                        <MapPin size={18} className="event-button" />
                        <Tooltip title={event?.location || ""}>
                            <span className="event-detail-location">
                                {event.location}
                            </span>
                        </Tooltip>
                    </div>
                )}

                {event?.recurrence?.frequency !== "none" && (
                    <div className="event-detail-section">
                        <Repeat size={18} className="event-button" />

                        <span className="event-detail-text">
                            Repeats {event?.recurrence?.frequency}
                        </span>
                    </div>
                )}

                {event?.description && (
                    <Tooltip title={event?.description || ""}>
                        <div className="event-detail-description">
                            {event.description}
                        </div>
                    </Tooltip>
                )}

            </div>
        </Menu>
    );
}