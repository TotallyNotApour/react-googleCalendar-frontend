import * as React from "react";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from '@mui/material/ListItemText';

import { ChevronDown } from "lucide-react";
    
import "../../styles/ViewDropdown.css";
import dayjs, { Dayjs } from "dayjs";
import { PersonalizeRecurrenceMenu } from "./PresonnalizeRecurrenceMenu";

interface recurrenceDropdownProps {
    startTime: Dayjs | null;
    recurrenceOptions: RecurrenceOptions;
    setRecurrenceOptions: React.Dispatch<React.SetStateAction<RecurrenceOptions>>;
}
interface RecurrenceOptions {
    frequency: "none" | "daily" | "weekly" | "monthly" | "yearly";
    interval: number;
    firstOccurence?: Date;
    until?: Date;
}


function RecurrenceDropdown({ startTime, recurrenceOptions, setRecurrenceOptions }: recurrenceDropdownProps) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [personalizedOpen, setPersonalizedOpen] = React.useState(false);

    const open = Boolean(anchorEl);

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (string: string) => {
        let recurrence: RecurrenceOptions;
        switch (string) {
            default:
            case "daily":
                recurrence = {
                    frequency: "daily",
                    interval: 1,
                }
                break;
            case "weekly":
                recurrence = {
                    frequency: "weekly",
                    interval: 1,
                }
                break;
            case "monthly":
                recurrence = {
                    frequency: "monthly",
                    interval: 1,
                }
                break;
            case "yearly":
                recurrence = {
                    frequency: "yearly",
                    interval: 1,
                }
                break;
            case "personalized":
                recurrence = {
                    frequency: "none",
                    interval: 1,
                }
                break;
        }
        setRecurrenceOptions(recurrence);
        handleClose();
    };

    const handlePersonalizedSelect = () => {
        handleClose();
        setPersonalizedOpen(true);
    };

    const handlePersonalizedClose = () => {
        setPersonalizedOpen(false);
    };

    return (
        <div className="recurrence-dropdown-card">
            <Button
                onClick={handleClick}
                endIcon={<ChevronDown />}
                sx={{
                    fontFamily: "Google Sans Flex",

                    minHeight: "unset",

                    maxWidth: "100%",
                    color: "var(--text-color)",
                    backgroundColor: "#f1f3f4",

                    border: "1px solid #dadce0",

                    borderRadius: "8px",

                    padding: "8px 12px",

                    margin: 0,

                    fontSize: "14px",

                    fontWeight: 400,

                    lineHeight: 1.4,

                    textTransform: "none",

                    justifyContent: "space-between",

                    whiteSpace: "normal",

                    textAlign: "left",

                    cursor: "pointer",

                    transition: `
                        background-color 0.2s ease,
                        border-color 0.2s ease,
                        transform 0.1s ease
                    `,

                    boxShadow: "none",

                    "&:hover": {
                        backgroundColor: "#e8eaed",
                        borderColor: "#dadce0",
                        boxShadow: "none",
                    },

                    "&:active": {
                        transform: "scale(0.98)",
                    },

                    "& .MuiButton-endIcon": {
                        marginLeft: "8px",
                    },
                }}

                variant="outlined"
            >
                {recurrenceOptionToNameHelper(startTime, recurrenceOptions)}            
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}

                slotProps={{
                    root: {
                        sx: {
                            zIndex: 10000,
                        },
                    },
                    paper: {
                        sx: {
                            width: "fit-content",
                            borderRadius: "12px",
                            padding: "8px",
                            zIndex: 10000,
                        },
                    },
                }}
            >
                <MenuItem
                    onClick={() => handleSelect("daily")}

                    sx={{
                        borderRadius: "12px",
                        padding: "10px 14px",
                    }}
                >
                    <ListItemText
                        primary="Happens every day"

                        sx={{
                            fontFamily: "Google Sans Flex",
                            fontSize: 16,
                        }}
                    />
                </MenuItem>

                <MenuItem
                    onClick={() => handleSelect("weekly")}

                    sx={{
                        borderRadius: "12px",
                        padding: "10px 14px",
                    }}
                >
                    <ListItemText
                        primary= {"Every " + dayjs(startTime).format("dddd")}
                    
                        sx={{
                            fontFamily: "Google Sans Flex",
                            fontSize: 16,
                        }}
                    />
                </MenuItem>

                <MenuItem
                    onClick={() => handleSelect("monthly")}

                    sx={{
                        borderRadius: "12px",
                        padding: "10px 14px",
                    }}
                >
                    <ListItemText
                        primary={"Every month on the " + dayjs(startTime).format("D")}

                        sx={{
                            fontFamily: "Google Sans Flex",
                            fontSize: 16,
                        }}
                    />
                </MenuItem>

                <MenuItem
                    onClick={() => handleSelect("yearly")}

                    sx={{
                        borderRadius: "12px",
                        padding: "10px 14px",
                    }}
                >
                    <ListItemText
                        primary={"Every year on " + dayjs(startTime).format("MMMM D")}

                        sx={{
                            fontFamily: "Google Sans Flex",
                            fontSize: 16,
                        }}
                    />
                </MenuItem>
                <MenuItem
                    onClick={() => handlePersonalizedSelect()}

                    sx={{
                        borderRadius: "12px",
                        padding: "10px 14px",
                    }}
                >
                    <ListItemText
                        primary="Personalized"

                        sx={{
                            fontFamily: "Google Sans Flex",
                            fontSize: 16,
                        }}
                    />
                </MenuItem>
            </Menu>
            <PersonalizeRecurrenceMenu
                recurrenceOptions={recurrenceOptions}
                setRecurrenceOptions={setRecurrenceOptions}
                open={personalizedOpen}
                onClose={handlePersonalizedClose}
            />
        </div>
    );
}

function recurrenceOptionToNameHelper(startTime: dayjs.Dayjs | null, recurrenceOptions: RecurrenceOptions): string {
    switch (recurrenceOptions.frequency) {
        case "none":
            return "Once";
        case "daily":
            return "Happens every day";
        case "weekly":
            return "Every week on " + dayjs(startTime).format("dddd");
        case "monthly":
            return "Every month on the " + dayjs(startTime).format("D");
        case "yearly":
            return "Every year on " + dayjs(startTime).format("MMMM D");
    }
}

export default RecurrenceDropdown;
