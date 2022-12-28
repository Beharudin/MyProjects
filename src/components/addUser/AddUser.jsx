import StyledDiv from "./addUserStyle.js";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "../../pages/login/Login";
import { uiActions } from "../../store/ui.js";
import { _host, AUTH_PORT } from "../../index.js";

const AddUser = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const enterNewUser = async (data) => {
    try {
      const url = `http://${_host}:${AUTH_PORT}/api/v1/addUser`;
      await axios.post(url, data);
      return { status: 200, msg: "user added successfully" };
    } catch (err) {
      console.log(err);
      return { status: 500, msg: "something went wrong" };
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
    };
    if (!(await Login.unameIsValid(data.email))) {
      dispatch(uiActions.notif({ type: "danger", msg: "invalid email" }));
    } else if (data.password.length != 8 || data.password.includes("*")) {
      dispatch(uiActions.notif({ type: "danger", msg: "invalid password" }));
    } else if (data.password != data.cpassword) {
      dispatch(
        uiActions.notif({ type: "danger", msg: "passwords don't match" })
      );
    } else {
      //spin
      dispatch(uiActions.startLoad());

      const result = await enterNewUser(data);
      if (result.status === 200) {
        dispatch(uiActions.notif({ type: "success", msg: result.msg }));
        dispatch(uiActions.stopLoad());
      } else if (result.status === 500) {
        dispatch(uiActions.notif({ type: "danger", msg: result.msg }));
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
            <label>Firstname:</label>
            <br />
            <input name="firstName" type="text" id="fname" placeholder="" />
            <br />
            <label>Lastname:</label>
            <br />
            <input name="lastName" type="text" id="lname" placeholder="" />
            <br />
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
            role___
            <select name="role" id="selection">
              <option>admin</option>
              <option>hr</option>
              <option>finance</option>
            </select>
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
      <NewUserForm />
    </div>
     </StyledDiv>
  );
};

export default AddUser;
