import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui.js";
import { Alert } from "@mui/material";

const Notify = () => {
  const msg = useSelector((state) => state.ui.notif.msg);
  const type = useSelector((state) => state.ui.notif.type);
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(
      uiActions.notif({
        type: "",
        msg: "",
      })
    );
  };
  const _msg = msg
    ? msg
    : type === "error"
    ? "something went wrong"
    : "operation successful";
  return (
    <Alert onClose={closeHandler} severity={type}>
      {_msg}
    </Alert>
  );
};

export default Notify;
