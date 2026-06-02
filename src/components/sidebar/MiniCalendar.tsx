import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "../../styles/MiniCalendar.css";

type CalendarView = "month" | "week" | "day";

interface SidebarProps {
    view: CalendarView;
    currentDate: Date;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

function MiniCalendar({view, currentDate, setCurrentDate}: SidebarProps) {

    return (
        <div className="mini-calendar">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar className="mini-calendar-dateCalendar"
                    showDaysOutsideCurrentMonth 
                    fixedWeekNumber={6} 
                    onChange={(newValue) => {
                        if (newValue) {
                            setCurrentDate(newValue.toDate());
                        }
                    }}
                    sx={{
                        margin: "10px",

                        "& .MuiPickersCalendarHeader-root": {
                            minHeight: "32px",
                            maxHeight: "32px",
                            margin: 0,
                            paddingX: " 10px",
                        },

                        "& .MuiPickersCalendarHeader-label": {
                            fontSize: "0.85rem",
                            fontFamily: "Google Sans Flex",
                            fontWeight: 600,
                            color: "var(--text-color)"
                        },


                        "& .MuiSvgIcon-root": {
                            fontSize: "1.2rem",
                        },

                        "& .MuiDayCalendar-header": {
                            justifyContent: "space-around",
                        },

                        "& .MuiDayCalendar-weekDayLabel": {
                            width: 20,
                            height: 20,
                            fontSize: "0.7rem",
                            fontFamily: "Google Sans Flex",
                            fontWeight: 700,
                            margin: 0,
                        },

                        "& .MuiButtonBase-root": {
                            width: "24px !important",
                            height: "24px !important",
                            fontSize: "0.75rem",
                        },

                        "& .MuiDateCalendar-root": {
                            width: "100%"
                        },

                        "& .MuiDayCalendar-weekContainer": {
                            width: "100%",
                            justifyContent: "space-around"
                        },

                        "& .MuiPickerDay-today": {
                            backgroundColor: "var(--primary-color) !important",
                            color: "white",
                            outline: 0,
                        },

                        "& .MuiPickerDay-today:hover": {
                            backgroundColor: "var(--primary-color-hover) !important",
                        },

                        "& .Mui-selected.Mui-focusVisible": {
                            backgroundColor: "#d5d5d5 !important",
                        },

                        "& .MuiPickersDay-root:focus": {
                            backgroundColor: "#d5d5d5 !important",
                        },

                        "& .Mui-selected": {
                            backgroundColor: "#d5d5d5",
                            color: "black"
                        },

                        "& .Mui-selected:hover": {
                            backgroundColor: "#b5b5b5",
                        },
                    }}
                />
            </LocalizationProvider>
        </div>
    );
}

export default MiniCalendar;