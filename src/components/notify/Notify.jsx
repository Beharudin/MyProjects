import StyledDiv from "./notifyStyle.js";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui.js";

const Notify = (props) => {
  const msg = useSelector((state) => state.ui.notif.msg);
  const type = useSelector((state) => state.ui.notif.type);
  const dispatch = useDispatch();

  if (type) {
    setTimeout(() => {
      dispatch(
        uiActions.notif({
          type: "",
          msg: "",
        })
      );
    }, 3000);
  }

  const classname = `alert-simple alert-${type}`;
  return (
    <StyledDiv>
      <div className="notify">
        <p className={classname} style={{ textAlign: "center" }}>
          {msg}
        </p>
      </div>
    </StyledDiv>
  );
};

export default Notify;
