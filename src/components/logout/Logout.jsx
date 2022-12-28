import { authActions } from "../../store/auth.js";
import { useDispatch } from "react-redux";
import { cookies } from "../../index.js";

const Logout = () => {
  const dispatch = useDispatch();

  const logoutHandler = (event) => {
    event.preventDefault();
    cookies.remove("token");
    cookies.remove("role");
    dispatch(authActions.logout());
  };

  return (
    <a onClick={logoutHandler} href="">
      <i className="fa fa-power-off fa-2x"></i>
      <span className="nav-text">Logout</span>
    </a>
  );
};

export default Logout;
