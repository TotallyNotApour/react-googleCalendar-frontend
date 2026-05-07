import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../styles/SideBarCalendar.css";

function SidebarCalendar() {
    return (
        <div className="sidebar-calendar">
            <DayPicker mode="range" />
        </div>
    );
}

export default SidebarCalendar;
