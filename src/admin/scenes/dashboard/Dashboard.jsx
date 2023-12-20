import React from "react";
import { Box, Typography } from "@mui/material";
import StatBox from "../../components/StatBox";
import Loader from "../../components/Loader";
import { useState, useEffect } from "react";
import { MenuBook } from "@mui/icons-material";
import ServicesList from "../../components/ServicesList";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import { useSelector } from "react-redux";
import Notifications from "../../../components/common/Notifications";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const notification = useSelector((state) => state.ui.notification);

  return (
    <>
      {loading ? (
        <Loader />
      ) : true ? (
        <>
          <Box m="20px">
            <Box
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gridAutoRows="140px"
              gap="20px"
            >
              {/* ROW 1 */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  gridColumn: { xs: "span 12", sm: "span 4" },
                  boxShadow: `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`,
                }}
              >
                <StatBox
                  title="12,361"
                  subtitle="Novels"
                  progress="0.14"
                  increase="+14%"
                  icon={<MenuBook sx={{ fontSize: "26px" }} />}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  gridColumn: { xs: "span 12", sm: "span 4" },
                  boxShadow: `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`,
                }}
              >
                <StatBox
                  title="431,225"
                  subtitle="Poems"
                  progress="0.21"
                  increase="+21%"
                  icon={<MenuBook sx={{ fontSize: "26px" }} />}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  gridColumn: { xs: "span 12", sm: "span 4" },
                  boxShadow: `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`,
                }}
              >
                <StatBox
                  title="32,441"
                  subtitle="Posts"
                  progress="0.05"
                  increase="+5%"
                  icon={<MenuBook sx={{ fontSize: "26px" }} />}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "50px",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  marginLeft: "50px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Our Services
              </Typography>
              <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap="20px"
                sx={{ marginBottom: "50px", marginTop: "10px" }}
              >
                <Box
                  height="50vh"
                  sx={{
                    gridColumn: { xs: "span 12", sm: "span 8" },
                    boxShadow: 2,
                  }}
                >
                  <LineChart />
                </Box>
                <Box
                  height="50vh"
                  sx={{
                    gridColumn: { xs: "span 12", sm: "span 4" },
                    boxShadow: 2,
                  }}
                >
                  <PieChart />
                </Box>
              </Box>
            </Box>
            <Box>
              <ServicesList title="novels" />
              <ServicesList title="poems" />
              <ServicesList title="posts" />
            </Box>
          </Box>
        </>
      ) : notification ? (
        <Notifications
          type={notification.type}
          message={notification.message}
        />
      ) : (
        "Something went wrong, please try again later!"
      )}
    </>
  );
};

export default Dashboard;
