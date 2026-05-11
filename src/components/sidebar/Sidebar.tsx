import { Plus, ChevronDown } from "lucide-react";
import MiniCalendar from "./MiniCalendar"
import "../../styles/SideBar.css";
import Tooltip from "@mui/material/Tooltip";


type CalendarView = "month" | "week" | "day";

interface SidebarProps {
    view: CalendarView;
    currentDate: Date;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
    onOpenCreateModal: () => void;
}

function Sidebar({view, currentDate, setCurrentDate, onOpenCreateModal}: SidebarProps) {


    return (
        <div className="calendar-sidebar">
            <Tooltip title="Create">
                <button
                    className="calendar-create-button"
                    onClick={onOpenCreateModal}
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
        </div>
    );
}

export default Sidebar