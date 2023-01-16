import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { cookies } from "../..";
import Drawer from "../../components/drawer/Drawer";
import Header from "../../components/header/Header";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { Box } from "@mui/material";
import SpinLoader from "../../components/spinloader/SpinLoader";
import Notify from "../../components/notify/Notify";

const opts = [
  { text: "Task list", icon: [<PlaylistAddIcon />] },
  { text: "My tasks", icon: [<PlaylistAddCheckIcon />] },
];

const StaffHome = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Drawer drawerOptions={opts}>
        <Notify />
        <SpinLoader />
      </Drawer>
    </Box>
  );
};

export default StaffHome;
