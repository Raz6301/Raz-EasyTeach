import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { StudentCard } from "../models/types/studentTypes";

interface ConfirmationDialogProps {
  open: boolean;
  student: StudentCard | null;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  open,
  student,
  message,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message} <br />
          {`Are you sure you want to perform this action on ${student?.MyArray[0].title.replace(
            /✅|❌|❗/g,
            ""
          )}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
