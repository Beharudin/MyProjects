import Notify from "../../components/notify/Notify";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar";
import SpinLoader from "../../components/spinloader/SpinLoader";

const CustomerHome = () => {
  const errType = useSelector((state) => state.ui.notif.type);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const isPending = useSelector((state) => state.ui.isLoading);

  if (userData.role != "customer" || !isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }

  return (
    <div>
      {errType && <Notify />}
      {isPending && <SpinLoader />}
      <Sidebar sidebarOptions={[]} />
    </div>
  );
};

export default CustomerHome;
