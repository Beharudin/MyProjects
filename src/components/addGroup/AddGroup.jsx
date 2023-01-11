import StyledDiv from "./addGroupStyle.js";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "../../pages/login/Login";
import { uiActions } from "../../store/ui.js";
import { _host, BASE_CAMADPTR_URL, BASE_AUTH_URL } from "../../index.js";
import { useState } from "react";

const AddGroup = () => {
  const dispatch = useDispatch();
  const [groups, setGroups] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const groupNameIsValid = (uname) => {
    return true;
  };

  const enterNewGroup = async (data) => {
    try {
      console.log("dataaaa", data);
      //save group
      const url = `${BASE_CAMADPTR_URL}/createGroup`;
      data = {
        groupInfo: {
          id: data.groupName,
          name: data.groupName,
        },
      };
      await axios.post(url, data);

      return { status: 200, msg: "group added successfully" };
    } catch (err) {
      console.log(err);
      const msg =
        err.response?.data?.error &&
        typeof err.response?.data?.error === "string"
          ? err.response?.data?.error
          : "something went wrong";
      return { status: 500, msg };
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    let data = new FormData(event.currentTarget);
    data = {
      groupName: data.get("groupName"),
    };
    if (!groupNameIsValid(data.groupName)) {
      dispatch(uiActions.notif({ type: "error", msg: "invalid group name" }));
    } else {
      //spin
      dispatch(uiActions.startLoad());

      const result = await enterNewGroup(data);
      if (result.status === 200) {
        dispatch(uiActions.notif({ type: "success", msg: result.msg }));
        dispatch(uiActions.stopLoad());
      } else if (result.status === 500) {
        dispatch(uiActions.notif({ type: "error", msg: result.msg }));
        dispatch(uiActions.stopLoad());
      }
    }
  };

  const NewGroupForm = () => {
    return (
      <div
        className="addGroup"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="form1">
          <br />
          <form onSubmit={submitHandler}>
            <label>Group name:</label>
            <br />
            <input name="groupName" type="text" id="gname" placeholder="" />
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  };

  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }

  return (
    <StyledDiv>
      <div>
        <NewGroupForm />
      </div>
    </StyledDiv>
  );
};

export default AddGroup;
