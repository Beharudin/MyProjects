import React from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Collapse } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showNotificationMessage } from "../../store/uiSlice";

function Notifications({ type, message }) {
  const open = useSelector((state) => state.ui.notification.open);
  const dispatch = useDispatch();

  return (
    <div>
      <Collapse in={open}>
        <Alert
          severity={type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                dispatch(
                  showNotificationMessage({
                    open: false,
                  })
                );
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </div>
  );
}

export default Notifications;
