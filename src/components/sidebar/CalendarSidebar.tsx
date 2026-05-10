import { Plus, ChevronDown } from "lucide-react";
import MiniCalendar from "./MiniCalendar"
import "../../styles/SideBarCalendar.css";
import Tooltip from "@mui/material/Tooltip";
import CreateEventModal from "./CreateEventModal"
import { useState } from "react";


type CalendarView = "month" | "week" | "day";

interface SidebarProps {
    view: CalendarView;
    currentDate: Date;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;

}

function CalendarSidebar({view, currentDate, setCurrentDate}: SidebarProps) {

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <div className="calendar-sidebar">
            <Tooltip title="Create">
                <button
                    className="calendar-create-button"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <Plus className="calendar-add-icon" />

                    <h1 className="calendar-create-button-title">
                        Create
                    </h1>

                    <ChevronDown className="calendar-dropdown-icon" />
                </button>
            </Tooltip>
            <MiniCalendar 
                view={view}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
              />


              {isCreateModalOpen && (
                <CreateEventModal 
                    currentDate={currentDate}
                    onClose={() => setIsCreateModalOpen(false)}
                />
            )}
        </div>

        
    );
}

export default CalendarSidebar