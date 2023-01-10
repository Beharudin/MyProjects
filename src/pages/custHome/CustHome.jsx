import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SideDrawer from "../../components/drawer/Drawer";
import Header from "../../components/header/Header";

const CustHome = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }
  return (
    <>
      <Header />
      <SideDrawer />
    </>
  );
};
export default CustHome;
