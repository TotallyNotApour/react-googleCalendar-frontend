import Draggable from "react-draggable";
import { useRef, useState} from "react";
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

function CreateEventModal({ currentDate, onClose }: CreateEventModalProps) {
    const nodeRef = useRef<HTMLDivElement>(null);

    const [selectedColor, setSelectedColor] = useState(colors[0]);

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

    const handleSave = async () => {
        if (isSaving) {
            return;
        }

        setIsSaving(true);

        const newEvent: CalendarEvent = {
            user: "user-id-placeholder",
            title: "Event title placeholder",
            description: "Event description placeholder",
            startDate: isAllDay && allDayStartDate
                ? allDayStartDate.startOf("day").toDate()
                : eventDate && startTime
                    ? eventDate.hour(startTime.hour()).minute(startTime.minute()).toDate()
                    : new Date(),
            endDate: isAllDay && allDayEndDate
                ? allDayEndDate.endOf("day").toDate()
                : eventDate && endTime
                    ? eventDate.hour(endTime.hour()).minute(endTime.minute()).toDate()
                    : new Date(),
            allDay: isAllDay,
            color: selectedColor,
            recurrence: {
                frequency: recurrenceOptions.frequency ,
                interval: recurrenceOptions.interval,
                firstOccurence: recurrenceOptions.firstOccurence,
                until: recurrenceOptions.until,
            },

        };

        await new Promise((resolve) => setTimeout(resolve, 500));

        console.log(newEvent);

        setIsSaving(false);
        onClose();
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
                                className="event-row-input"
                                placeholder="Add location"
                            />
                        </div>

                        <div className="event-row">
                            <AlignLeft className="event-row-icon" />
                            <textarea
                                className="event-description-input"
                                placeholder="Add description"
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
