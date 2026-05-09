import * as React from "react";

import { Menu, ChevronLeft, ChevronRight, Search } from "lucide-react";
import ViewDropdown from "../taskbar/ViewDropdown"
import "../../styles/Taskbar.css";


type CalendarView = "month" | "week" | "day";

interface TaskbarProps {
    email: string | null;
    view: CalendarView;
    setView: React.Dispatch<React.SetStateAction<CalendarView>>;
}

function Taskbar({ email, view, setView }: TaskbarProps) {
    return (
        <div className="taskbar-card">
            <Menu className="taskbar-menu-icon" />
            <h1 className="taskbar-title">My Calendar</h1>

            <button className="taskbar-button-today">
                Today
            </button>

            <div className="taskbar-button-card">
                <ChevronLeft className="taskbar-arrow-button" />
                <ChevronRight className="taskbar-arrow-button" />
            </div>
            

            <h1 className="taskbar-month-year">
                June 2024
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