import React, { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Event } from "../models/types/studentTypes";

type Props = {
  isDialogOpen: boolean;
  onCloseDialog: () => void;
  onActionSelected: (action: string, event: Event) => void;
  selectedEvent: Event | null;
};

const FormDialogCalendar: FC<Props> = ({
  isDialogOpen,
  onCloseDialog,
  onActionSelected,
  selectedEvent,
}) => {
  const handleAction = (action: string) => {
    if (selectedEvent) {
      onActionSelected(action, selectedEvent);
      onCloseDialog();
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={onCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">
        {`Choose the right situation for the lesson to ${
          selectedEvent?.title
        } in ${selectedEvent?.start.toLocaleDateString()} `}{" "}
      </DialogTitle>{" "}
      <DialogActions
        sx={{
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
          rowGap: 2,
          justifyContent: "flex-start",
        }}
      >
        <Button
          onClick={() => handleAction("lessonTookPlace")}
          color="success"
          variant="outlined"
        >
          Occurred
        </Button>
        <Button
          onClick={() => handleAction("lessonCancelledByStudent")}
          color="error"
          variant="outlined"
        >
          Cancelled
        </Button>
        <Button
          onClick={() => handleAction("reset")}
          color="info"
          variant="outlined"
        >
          Reset
        </Button>
        <Button onClick={onCloseDialog} color="warning" variant="outlined">
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialogCalendar;
