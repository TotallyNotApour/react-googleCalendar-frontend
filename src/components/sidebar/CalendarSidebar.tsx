import { Plus, ChevronDown } from "lucide-react";
import MiniCalendar from "./MiniCalendar"
import "../../styles/SideBarCalendar.css";
import Tooltip from "@mui/material/Tooltip";
import CreateEventModal from "./CreateEventModal"
import { useState } from "react";
import type { CalendarEvent } from "../../types/CalendarEvent";


type CalendarView = "month" | "week" | "day";

interface SidebarProps {
    view: CalendarView;
    currentDate: Date;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
    onCreateEvent: (newEvent: CalendarEvent) => Promise<void>;
}

function CalendarSidebar({view, currentDate, setCurrentDate, onCreateEvent}: SidebarProps) {

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
                    onCreateEvent={onCreateEvent}
                />
            )}
        </div>

        
    );
}

export default CalendarSidebar