import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Dvr, Info, Message, PeopleAlt } from "@mui/icons-material";

const Item = ({ title, to, icon, selected, setSelected }) => {
  
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "#ededed",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: "#00aeef !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#fbfbfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#fbfbfb !important",
          background: "#33bef2 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
         <Menu iconShape="square">
            {/* LOGO AND MENU ICON  */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: "common.main",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color="common.main">
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon 
                  style={{
                    color: "#ededed",
                  }}/>
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/myphoto.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color="common.main"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Bahar MM
                </Typography>
                <Typography variant="h5" color="common.main">
                  Staff Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color="#fbfbfb"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Manage
            </Typography>
            <Item
              title="Website"
              to="/website"
              icon={<Dvr />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Services"
              to="/services"
              icon={<Dvr />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Messages"
              to="/messages"
              icon={<Message />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="About Us"
              to="/about"
              icon={<Info />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Features"
              to="/features"
              icon={<PeopleAlt />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Testimonials"
              to="/testimonials"
              icon={<PeopleAlt />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/faq"
              icon={<PeopleAlt />}
              selected={selected}
              setSelected={setSelected}
            />
            
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
