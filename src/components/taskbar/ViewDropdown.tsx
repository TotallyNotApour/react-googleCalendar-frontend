import * as React from "react";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { ChevronDown } from "lucide-react";
    
import "../../styles/ViewDropdown.css";

type CalendarView = "month" | "week" | "day";

interface Props {
    view: CalendarView;
    setView: React.Dispatch<React.SetStateAction<CalendarView>>;
}

function ViewDropdown({ view, setView }: Props) {

    const [anchorEl, setAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (newView: CalendarView) => {
        setView(newView);
        handleClose();
    };

    return (
        <div className="dropdown-card">
            <Button
                onClick={handleClick}
                endIcon={<ChevronDown />}
                sx={{
                    fontFamily: "Google Sans Flex",

                    minHeight: "unset",

                    color: "var(--text-color)",

                    border: "1px solid var(--text-color)",

                    borderRadius: "999px",

                    padding: "8px 30px",

                    margin: "0px 10px",

                    fontSize: "16px",

                    fontWeight: 500,

                    textTransform: "none",

                    cursor: "pointer",

                    transition: `
                        background-color 0.2s ease,
                        box-shadow 0.2s ease,
                        transform 0.1s ease
                    `,

                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",

                    "&:hover": {
                        backgroundColor: "gainsboro",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
                    },

                    "&:active": {
                        transform: "scale(0.98)",
                    },

                    ".& MuiButton-root": {
                        borderRadius: "100%"  
                    },
                }}

                variant="outlined"
            >
                {view.charAt(0).toUpperCase() + view.slice(1)}            
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}

                slotProps={{
                    paper: {
                        sx: {
                            width: 220,
                            borderRadius: "18px",
                            padding: "8px",
                        },
                    },
                }}
            >
                <MenuItem
                    onClick={() => handleSelect("day")}

                    sx={{
                        borderRadius: "12px",
                        padding: "10px 14px",
                    }}
                >
                    <ListItemText
                        primary="Day"

                        sx={{
                            fontFamily: "Google Sans Flex",
                            fontSize: 16,
                        }}
                    />

                    <Typography
                        variant="body2"

                        sx={{
                            color: "text.secondary",
                            fontFamily: "Google Sans Flex",
                        }}
                    >
                        D
                    </Typography>
                </MenuItem>

                <MenuItem
                    onClick={() => handleSelect("week")}

                    sx={{
                        borderRadius: "12px",
                        padding: "10px 14px",
                    }}
                >
                    <ListItemText
                        primary="Week"

                        sx={{
                            fontFamily: "Google Sans Flex",
                            fontSize: 16,
                        }}
                    />

                    <Typography
                        variant="body2"

                        sx={{
                            color: "text.secondary",
                            fontFamily: "Google Sans Flex",
                        }}
                    >
                        W
                    </Typography>
                </MenuItem>

                <MenuItem
                    onClick={() => handleSelect("month")}

                    sx={{
                        borderRadius: "12px",
                        padding: "10px 14px",
                    }}
                >
                    <ListItemText
                        primary="Month"

                        sx={{
                            fontFamily: "Google Sans Flex",
                            fontSize: 16,
                        }}
                    />

                    <Typography
                        variant="body2"

                        sx={{
                            color: "text.secondary",
                            fontFamily: "Google Sans Flex",
                        }}
                    >
                        M
                    </Typography>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default ViewDropdown;