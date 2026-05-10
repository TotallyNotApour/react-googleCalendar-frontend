import * as React from "react";

import { Menu, ChevronLeft, ChevronRight, Search } from "lucide-react";
import ViewDropdown from "../taskbar/ViewDropdown"
import "../../styles/Taskbar.css";


type CalendarView = "month" | "week" | "day";

interface TaskbarProps {
    email: string | null;
    view: CalendarView;
    currentDate: Date;
    setView: React.Dispatch<React.SetStateAction<CalendarView>>;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>
}

function Taskbar({ email, view, currentDate, setView, setCurrentDate }: TaskbarProps) {

    const handleToday = () => {
        setCurrentDate(new Date());
    }

    const goNext = () => {
        const newDate = new Date(currentDate);
        if (view === "month") {
            newDate.setDate(1);
            newDate.setMonth(newDate.getMonth() + 1);
        } else if (view === "week") {
            newDate.setDate(newDate.getDate() + 7);
        } else if (view === "day") {
            newDate.setDate(newDate.getDate() + 1);
        }

        setCurrentDate(newDate);
    }

    const goPrevious = () => {
        const newDate = new Date(currentDate);
        if (view === "month") {
            newDate.setDate(1);
            newDate.setMonth(newDate.getMonth() - 1);
        } else if (view === "week") {
            newDate.setDate(newDate.getDate() - 7);
        } else if (view === "day") {
            newDate.setDate(newDate.getDate() - 1);
        }

        setCurrentDate(newDate);
    }

    return (
        <div className="taskbar-card">
            <Menu className="taskbar-menu-icon" />
            <h1 className="taskbar-title">My Calendar</h1>

            <button className="taskbar-button-today" onClick={handleToday}>
                Today
            </button>

            <div className="taskbar-button-card">
                <ChevronLeft className="taskbar-arrow-button" onClick={goPrevious}/>
                <ChevronRight className="taskbar-arrow-button" onClick={goNext}/>
            </div>
            

            <h1 className="taskbar-month-year">
                {currentDate.toLocaleDateString("fr-CA", {
                    month: "long",
                    year: "numeric",
                })}
            </h1>

            <div className="taskbar-right-section">
                <Search className="taskbar-search-icon" />

                <ViewDropdown view={view} setView={setView} />
                <div className="taskbar-profile-icon">
                    <h1 className="taskbar-profile-initial">
                        {email?.[0].toLocaleUpperCase() || ""}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Taskbar;