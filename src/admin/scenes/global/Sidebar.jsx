import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Dvr, FeaturedPlayList, HelpOutline, Info, Language, Message, PeopleAlt } from "@mui/icons-material";
import { useEffect } from "react";

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
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  // useEffect(() => {
  //   if (!user.length) {
  //     window.location.href = "/admin/login";
  //   } else {
  //     setLoading(false);
  //   }
  // }, []);

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
      {loading ? null : (
        <>
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
                        }}
                      />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>

              {!isCollapsed && (
                <Box mb="25px">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      alt="Profile Img"
                      width="100px"
                      height="100px"
                      src={"http://localhost:3001/images/" }
                      // src={"http://localhost:3001/images/" + user.profile_img}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>
                  <Box textAlign="center">
                    <Typography
                      variant="h3"
                      color="common.main"
                      fontWeight="bold"
                      sx={{ m: "10px 0 0 0" }}
                    >
                      {/* {user.email} */}Mohammed Baker
                    </Typography>
                    <Typography variant="h5" color="common.main">
                      Admin
                    </Typography>
                  </Box>
                </Box>
              )}

              <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                <Item
                  title="Dashboard"
                  to="/admin"
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
                  to="/admin/website"
                  icon={<Language />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="About Us"
                  to="/admin/about"
                  icon={<Info />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Novels"
                  to="/admin/novels"
                  icon={<Dvr />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Poems"
                  to="/admin/poems"
                  icon={<FeaturedPlayList />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Posts"
                  to="/admin/posts"
                  icon={<Message />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Videos"
                  to="/admin/videos"
                  icon={<Message />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Testimonials"
                  to="/admin/testimonials"
                  icon={<PeopleAlt />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </Box>
            </Menu>
          </ProSidebar>
        </>
      )}
    </Box>
  );
};

export default Sidebar;
