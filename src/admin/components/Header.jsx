import React from "react";
import { Typography, Box} from "@mui/material";

const Header = ({ title, subtitle }) => {
 
  return (
      <Box mb="30px">
        <Typography
          variant="h2"
          color="#2f2f2f"
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          {title}
        </Typography>
        <Typography variant="h5" color="#2f2f2f">
          {subtitle}
        </Typography>
      </Box>
  );
};

export default Header;
