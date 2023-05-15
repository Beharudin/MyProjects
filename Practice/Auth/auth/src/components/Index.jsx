import React from "react";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import Topbar from "./Topbar";

function Index() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <div className="row body">
          <div className="col-xs-12 col-md-6 mb-5">
            <Paper elevation={3}>
              <Button href="#text-buttons">CoopLOS</Button>
            </Paper>
          </div>
          <div className="col-xs-12 col-md-6 mb-5">
            <Paper elevation={3}>
              <Button href="#text-buttons">Legal Advice</Button>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
