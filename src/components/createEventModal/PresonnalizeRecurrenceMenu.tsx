
import type { Dispatch, SetStateAction } from "react";

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';


interface RecurrenceOptions {
    frequency: "none" | "daily" | "weekly" | "monthly" | "yearly";
    interval: number;
    firstOccurence?: Date;
    until?: Date;
}

interface PersonalizeRecurrenceMenuProps {
    open: boolean;
    onClose: () => void;

    recurrenceOptions: RecurrenceOptions;
    setRecurrenceOptions: Dispatch<SetStateAction<RecurrenceOptions>>;
}

export function PersonalizeRecurrenceMenu(props: PersonalizeRecurrenceMenuProps) { 
    const { open, onClose } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            slotProps={{
                root: {
                    sx: {
                        zIndex: 10001,
                    },
                },
                paper: {
                    sx: {
                        borderRadius: "16px",
                    },
                },
            }}
        >
            <DialogTitle>
                Personalize Recurrence
            </DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>
                    Save
                </Button>
        </DialogActions>
        </Dialog>
    );
}
