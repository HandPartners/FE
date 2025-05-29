import { Alert, Snackbar, type AlertColor } from "@mui/material";
import { useState } from "react";

interface ToastProps {
  message: string;
  type: AlertColor;
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
