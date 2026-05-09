import { Plus, ChevronDown } from "lucide-react";
import MiniCalendar from "./MiniCalendar"
import "../../styles/SideBarCalendar.css";
import Tooltip from "@mui/material/Tooltip";

function CalendarSidebar() {
    return (
        <div className="calendar-sidebar">
            <Tooltip title="Create">
                
                <button
                    className="calendar-create-button"
                    onClick={() => alert("Add new event")}
                >
                    <Plus className="calendar-add-icon" />

                    <h1 className="calendar-create-button-title">
                        Create
                    </h1>

                    <ChevronDown className="calendar-dropdown-icon" />
                </button>
            </Tooltip>
            <MiniCalendar />
        </div>
    );
}

export default CalendarSidebar