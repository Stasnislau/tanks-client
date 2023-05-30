import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

interface WinnerModalProps {
  status: string;
  onClose: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ status, onClose }) => {
  let title = "";
  let message = "";

  if (status === "blue") {
    title = "Congratulations!";
    message = "Blue team wins the game!";
  } else if (status === "red") {
    title = "Congratulations!";
    message = "Red team wins the game!";
  } else {
    title = "Game Over";
    message = "The game ended in a draw.";
  }

  return (
    <Dialog open={!!status} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WinnerModal;