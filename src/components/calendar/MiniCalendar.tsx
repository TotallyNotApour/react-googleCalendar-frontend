import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "../../styles/MiniCalendar.css";

function MiniCalendar() {
    return (
        <div className="mini-calendar">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} className="mini-calendar-dateCalendar"
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

                        "& .Mui-selected": {
                            backgroundColor: "var(--primary-color) !important",
                            color: "white",
                        },

                        "& .Mui-selected:hover": {
                            backgroundColor: "var(--primary-color-hover) !important",
                        },

                        "& .MuiPickersDay-root:hover": {
                            backgroundColor: "var(--primary-color-hover)",
                        },
                    }}
                />
            </LocalizationProvider>
        </div>
    );
}

export default MiniCalendar;