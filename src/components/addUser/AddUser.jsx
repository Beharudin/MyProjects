import StyledDiv from "./addUserStyle.js";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "../../pages/login/Login";
import { uiActions } from "../../store/ui.js";
import { _host, BASE_CAMADPTR_URL, BASE_AUTH_URL } from "../../index.js";
import { useEffect, useState } from "react";

const AddUser = () => {
  const dispatch = useDispatch();
  const [groups, setGroups] = useState([]);
  const [roles, setRoles] = useState([]);
  const sb = useSelector((state) => state.sb.option);

  const userData = useSelector((state) => state.auth.userData);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const unameIsValid = (uname) => {
    return true;
  };

  const enterNewUser = async (data) => {
    try {
      console.log("dataaa", data);
      //create or get db user and save id
      const url = `${BASE_AUTH_URL}/addUser`;
      await axios.post(url, data);

      return { status: 200, msg: "user added successfully" };
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
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      cpassword: data.get("cpassword"),
      role: data.get("role"),
      groups: data.getAll("group"),
    };
    if (!(await unameIsValid(data.email))) {
      dispatch(uiActions.notif({ type: "error", msg: "invalid email" }));
    } else if (data.password.length != 8 || data.password.includes("*")) {
      dispatch(uiActions.notif({ type: "error", msg: "invalid password" }));
    } else if (data.password != data.cpassword) {
      dispatch(
        uiActions.notif({ type: "error", msg: "passwords don't match" })
      );
    } else {
      //spin
      dispatch(uiActions.startLoad());

      const result = await enterNewUser(data);
      if (result.status === 200) {
        dispatch(uiActions.notif({ type: "success", msg: result.msg }));
        dispatch(uiActions.stopLoad());
      } else if (result.status === 500) {
        dispatch(uiActions.notif({ type: "error", msg: result.msg }));
        dispatch(uiActions.stopLoad());
      }
    }
  };

  const NewUserForm = () => {
    return (
      <div
        className="addUser"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="form1">
          <br />
          <form onSubmit={submitHandler}>
            <label>Email:</label>
            <br />
            <input
              name="email"
              type="email"
              id="df"
              placeholder="example@moenco.com.et"
            />
            <br />
            <label>Password:</label>
            <br />
            <input
              name="password"
              type="password"
              id="req5"
              placeholder="Password"
            />
            <br />
            <label>Confirm password:</label>
            <br />
            <input
              name="cpassword"
              type="password"
              id="req6"
              placeholder="Password"
            />
            <br />
            <br />
            role
            <select name="role" id="selection">
              {roles.map((el) => (
                <option>{el}</option>
              ))}
            </select>
            <br />
            group
            {groups.map((el) => (
              <div>
                <input
                  type="checkbox"
                  id={`${el.id}-id`}
                  name="group"
                  value={el.id}
                />
                <label for={`${el.id}-id`}>{el.id}</label>
              </div>
            ))}
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  };
  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.get(`${BASE_CAMADPTR_URL}/getAllGroups`);
        const loadedGroups = resp.data.filter((el) => el.type != "SYSTEM");
        setGroups(loadedGroups);

        const resp2 = await axios.get(`${BASE_AUTH_URL}/getRoles`);
        const _roles = resp2.data;
        setRoles(_roles);
      } catch (error) {
        dispatch(uiActions.stopLoad());
        // handle error
        const msg =
          error?.response?.data?.error &&
          typeof error?.response?.data?.error === "string"
            ? error.response.data.error
            : "check your internet connection";
        dispatch(
          uiActions.notif({
            type: "error",
            msg,
          })
        );
        console.log(error);
      }
    })();
  }, [sb]);

  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }

  return (
    <StyledDiv>
      <div>
        <NewUserForm />
      </div>
    </StyledDiv>
  );
};

export default AddUser;
