import Draggable from "react-draggable";
import { useEffect, useRef, useState} from "react";
import { Clock, MapPin, AlignLeft, Palette, X } from "lucide-react";

import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import type { CalendarEvent }  from "../../types/CalendarEvent";
import "../../styles/CreateEventModal.css"
import RecurrenceDropdown from "./RecurrenceDropdown";



interface CreateEventModalProps {
    currentDate: Date;
    onClose: () => void;
    onCreateEvent: (event: CalendarEvent) => Promise<void>;
}

interface RecurrenceOptions {
    frequency: "none" | "daily" | "weekly" | "monthly" | "yearly";
    interval: number;
    firstOccurence?: Date;
    until?: Date;
}

const colors = [
        "#c15f3c",
        "#d16ba5",
        "#845ec2",
        "#4b8bbe",
        "#00c9a7",
        "#6bcB77",
        "#f9c74f",
        "#f8961e",
        "#f3722c",
        "#f94144",
    ];

type EventFormErrors = {
    eventDate?: boolean;
    allDayStartDate?: boolean;
    allDayEndDate?: boolean;
    startTime?: boolean;
    endTime?: boolean;
}

function CreateEventModal({ currentDate, onClose, onCreateEvent}: CreateEventModalProps) {
    const nodeRef = useRef<HTMLDivElement>(null);

    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [eventDate, setEventDate] = useState<Dayjs | null>(dayjs(currentDate));
    const [isAllDay, setIsAllDay] = useState(false);
    const [allDayStartDate, setAllDayStartDate] = useState<Dayjs | null>(dayjs(currentDate));
    const [allDayEndDate, setAllDayEndDate] = useState<Dayjs | null>(dayjs(currentDate));
    const [startTime, setStartTime] = useState<Dayjs | null>(dayjs(currentDate));
    const [endTime, setEndTime] = useState<Dayjs | null>(dayjs(currentDate).add(2, "hour"));
    const [isSaving, setIsSaving] = useState(false);
    const [recurrenceOptions, setRecurrenceOptions] = useState<RecurrenceOptions>({
        frequency: "none",
        interval: 1,
    });


    const [formErrors, setFormErrors] = useState<EventFormErrors>({});

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target;

            if (!(target instanceof Element)) return;
            if (nodeRef.current?.contains(target)) return;
            if (target.closest(".MuiPopover-root, .MuiPopper-root, .MuiModal-root")) return;

            onClose();
        };

        document.addEventListener("pointerdown", handlePointerDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [onClose]);

    const handleSave = async () => {
        if (isSaving) return;
        setFormErrors({});

        let startDate: Date;
        let endDate: Date;

        if (isAllDay) {
            if (!allDayStartDate || !allDayEndDate) {
                setFormErrors({
                    allDayStartDate: !allDayStartDate,
                    allDayEndDate: !allDayEndDate
                });
                return;
            }

            startDate = allDayStartDate.startOf("day").toDate();
            endDate = allDayEndDate.endOf("day").toDate();

            if (endDate <= startDate) {
                setFormErrors({
                    allDayStartDate: true,
                    allDayEndDate: true
                });
                return;
            }

        } else {
            if (!eventDate || !startTime || !endTime) {
                setFormErrors({
                    eventDate: !eventDate,
                    startTime: !startTime,
                    endTime: !endTime
                });
                return;
            }

            startDate = eventDate
                .hour(startTime.hour())
                .minute(startTime.minute())
                .second(0)
                .millisecond(0)
                .toDate();

            endDate = eventDate
                .hour(endTime.hour())
                .minute(endTime.minute())
                .second(0)
                .millisecond(0)
                .toDate();

            if (endDate <= startDate) {
                setFormErrors({
                    startTime: true,
                    endTime: true
                });
                return;
            }
        }

        setIsSaving(true);

        const newEvent: CalendarEvent = {
            title : title || "Untitled Event",
            description,
            location,
            startDate,
            endDate,
            allDay: isAllDay,
            color: selectedColor,
            recurrence: recurrenceOptions,
        };

        try {
            await onCreateEvent(newEvent);
            onClose();
        } catch (error) {
            console.error("Failed to create event:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Draggable handle=".create-event-modal-header" nodeRef={nodeRef} bounds="body">
                <div ref={nodeRef} className="create-event-modal">
                    <div className="create-event-modal-header">
                        <h2>Create event</h2>
                        <X className="create-event-modal-close" onClick={onClose} />
                    </div>
                    <div className="event-modal-body">
                        <input
                            className="event-title-input"
                            placeholder="Add title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                    <div className="event-row">
                            <Clock className="event-row-icon" />

                            <div className="event-row-content">
                                {isAllDay ? (
                                    <>
                                        <DatePicker
                                            label="Start date"
                                            value={allDayStartDate}
                                            onChange={(newValue) => setAllDayStartDate(newValue)}
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                    error: Boolean(formErrors.allDayStartDate),
                                                    sx: {
                                                        width: 150,
                                                    },
                                                },
                                                popper: {
                                                    sx: {
                                                        zIndex: 10000,
                                                    },
                                                },
                                            }}
                                        />
                                        <span>to</span>
                                        <DatePicker
                                            label="End date"
                                            value={allDayEndDate}
                                            onChange={(newValue) => setAllDayEndDate(newValue)}
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                    error: Boolean(formErrors.allDayEndDate),
                                                    sx: {
                                                        width: 150,
                                                    },
                                                },
                                                popper: {
                                                    sx: {
                                                        zIndex: 10000,
                                                    },
                                                },
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <DatePicker
                                            label="Date"
                                            value={eventDate}
                                            onChange={(newValue) => setEventDate(newValue)}
                                            slotProps={{
                                                textField: {
                                                    error: Boolean(formErrors.eventDate),
                                                    size: "small",
                                                    sx: {
                                                        width: 150,
                                                    },
                                                },
                                                popper: {
                                                    sx: {
                                                        zIndex: 10000,
                                                    },
                                                },
                                            }}
                                        />

                                        <TimePicker
                                            label="Start"
                                            value={startTime}
                                            onChange={(newValue) => setStartTime(newValue)}
                                            slotProps={{
                                                textField: {
                                                    error: Boolean(formErrors.startTime),
                                                    size: "small",

                                                    sx: {
                                                        width: 150,
                                                    },
                                                },
                                                popper: {
                                                    sx: {
                                                        zIndex: 10000,
                                                    },
                                                },
                                            }}
                                        />

                                        <span>to</span>

                                        <TimePicker
                                            label="End"
                                            value={endTime}
                                            onChange={(newValue) => setEndTime(newValue)}
                                            slotProps={{
                                                textField: {
                                                    error: Boolean(formErrors.endTime),
                                                    size: "small",

                                                    sx: {
                                                        width: 150,
                                                    },
                                                },
                                                popper: {
                                                    sx: {
                                                        zIndex: 10000,
                                                    },
                                                },
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="event-row">
                            <div />
                            <FormControlLabel
                                className="event-all-day-checkbox"
                                control={
                                    <Checkbox
                                        size="small"
                                        sx={{
                                            color: "var(--primary-color)",
                                            "&.Mui-checked": {
                                                color: "var(--primary-color)",
                                            },
                                        }}
                                    />
                                }
                                label="All day"
                                checked={isAllDay}
                                onChange={(_, checked) => setIsAllDay(checked)}
                            />
                        </div>

                        <div className="event-row">
                            <div />
                            <RecurrenceDropdown startTime={startTime} recurrenceOptions={recurrenceOptions} setRecurrenceOptions={setRecurrenceOptions} />
                        </div>

                        <div className="event-row">
                            <MapPin className="event-row-icon" />
                            <input
                                className="event-location-input"
                                placeholder="Add location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <div className="event-row">
                            <AlignLeft className="event-row-icon" />
                            <textarea
                                className="event-description-input"
                                placeholder="Add description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="event-row">
                            <Palette className="event-row-icon" />
                            <div className="event-color-picker">
                                {colors.map((color) => (

                                    <button
                                        key={color}

                                        className={`event-color-circle ${
                                            selectedColor === color
                                                ? "selected"
                                                : ""
                                        }`}

                                        style={{
                                            backgroundColor: color,
                                        }}

                                        onClick={() => setSelectedColor(color)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="event-button-save">
                            <button
                                className="create-event-modal-save-button"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            </Draggable>
        </LocalizationProvider>
    );
}

export default CreateEventModal;
