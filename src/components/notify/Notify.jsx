import StyledDiv from "./notifyStyle.js";
import { useSelector } from "react-redux";

const Notify = (props) => {
  const msg = useSelector((state) => state.ui.notif.msg);
  const type = useSelector((state) => state.ui.notif.type);
  const classname = `alert-simple alert-${type}`;
  console.log("cname: ", classname);
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
