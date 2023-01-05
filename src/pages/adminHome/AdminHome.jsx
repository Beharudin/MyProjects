import Notify from "../../components/notify/Notify";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar";
import { sbActions } from "../../store/sidebar.js";
import AddUser from "../../components/addUser/AddUser";
import SpinLoader from "../../components/spinloader/SpinLoader";
import AddGroup from "../../components/addGroup/AddGroup";
import ManageUsers from "../manageUsers/ManageUsers";

const AdminHome = () => {
  const dispatch = useDispatch();

  const notifType = useSelector((state) => state.ui.notif.type);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const sb = useSelector((state) => state.sb.option);
  const isPending = useSelector((state) => state.ui.isLoading);

  const addUserHanlder = (event) => {
    event.preventDefault();
    dispatch(sbActions.switch({ option: "addUser" }));
  };
  const addGroupHandler = (event) => {
    event.preventDefault();
    dispatch(sbActions.switch({ option: "addGroup" }));
  };
  const manageUsersHanlder = (event) => {
    event.preventDefault();
    dispatch(sbActions.switch({ option: "manageUsers" }));
  };

  if (userData.role != "admin" || !isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }
  const sidebarOptions = [
    <li className="has-subnav" key={1}>
      <a href="#" onClick={manageUsersHanlder}>
        <i className="fa fas fa-tasks-alt"></i>
        <span className="nav-text">Manage</span>
      </a>
    </li>,
    <li className="has-subnav" key={2}>
      <a href="#" onClick={addUserHanlder}>
        <i className="fa fas fa-user-plus"></i>
        <span className="nav-text">Add user</span>
      </a>
    </li>,
    <li className="has-subnav" key={3}>
      <a href="#" onClick={addGroupHandler}>
        <i className="fa fa-folder-plus"></i>
        <span className="nav-text">Add Group</span>
      </a>
    </li>,
  ];

  return (
    <div>
      {notifType && <Notify />}
      {isPending && <SpinLoader />}
      <Sidebar sidebarOptions={sidebarOptions} />
      {sb && sb === "addUser" && <AddUser />}
      {sb && sb === "addGroup" && <AddGroup />}
      {sb && sb === "manageUsers" && <ManageUsers />}
    </div>
  );
};

export default AdminHome;
