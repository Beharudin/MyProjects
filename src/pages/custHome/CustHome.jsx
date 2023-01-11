import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { BASE_CAMADPTR_URL, cookies } from "../..";
import SideDrawer from "../../components/drawer/Drawer";
import Header from "../../components/header/Header";
import HistoryIcon from "@mui/icons-material/History";
import MapIcon from "@mui/icons-material/Map";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const opts = [
  { text: "New Loan", icon: [<AddCircleIcon />] },
  { text: "See Loan Status", icon: [<MapIcon />] },
  { text: "History", icon: [<HistoryIcon />] },
];

const CustHome = () => {
  const userId = cookies.get("userId");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [drawerOptions, setDrawerOptions] = useState([]);

  const reloadDrawerOptions = async () => {
    const resp = await axios.get(
      `${BASE_CAMADPTR_URL}/getRunningProcessForCustomer?customerId=${userId}`
    );
    const optsWithOutNew = opts.filter((el) => el.text != "New Loan");
    const optsWithOutStatus = opts.filter((el) => el.text != "See Loan Status");
    if (resp.data.length > 0) {
      console.log("optsWithOutNew", optsWithOutNew);
      setDrawerOptions(optsWithOutNew);
    } else {
      console.log("optsWithOutStatus", optsWithOutStatus);
      setDrawerOptions(optsWithOutStatus);
    }
  };

  useEffect(() => {
    reloadDrawerOptions();
  }, [isLoggedIn]);
  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }
  return (
    <>
      <Header />
      <SideDrawer
        drawerOptions={drawerOptions}
        reloadDrawerOptions={reloadDrawerOptions}
      />
    </>
  );
};
export default CustHome;
