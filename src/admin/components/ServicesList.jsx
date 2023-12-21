import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "./Header";

const ServicesList = ({ title, data }) => {
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "topic",
      headerName: "Topic",
      flex: 1,
      cellClassName: "type-column--cell",
    },
    title === "novels" && {
      field: "section",
      headerName: "Section",
      flex: 1,
    },
    title === "videos" && {
      field: "link",
      headerName: "Link",
      flex: 1,
    },
    {
      field: "body",
      headerName: "Description",
      flex: 3,
      headerAlign: "left",
      align: "left",
    },
  ].filter(Boolean);

  return (
    <Box mt="50px">
      {data && (
        <>
          <Header title="" subtitle={`List of ${title} for my audience`} />
          <Box
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .type-column--cell": {
                color: "primary.light",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#bdbdbd",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#eeeeee",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: "#bdbdbd",
              },
              "& .MuiCheckbox-root": {
                color: `#c5e1a5 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#f5f5f5 !important`,
              },
              backgroundColor: "primary.main",
            }}
          >
            <DataGrid
              rows={data}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ServicesList;
