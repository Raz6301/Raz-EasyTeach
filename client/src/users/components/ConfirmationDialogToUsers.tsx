import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { FullUserType } from "../models/types/userTypes";

interface ConfirmationDialogProps {
  open: boolean;
  user: FullUserType | null;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialogToUsers: FC<ConfirmationDialogProps> = ({
  open,
  user,
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
          {`Are you sure to perform this action on ${user?.name.first}?`}
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

export default ConfirmationDialogToUsers;
