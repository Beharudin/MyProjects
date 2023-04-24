import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { dataServices } from "../scenes/data/mockData";
import Header from "./Header";

const ServicesList = ({title}) => {

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "topic",
      headerName: "Topic",
      flex: 1,
      cellClassName: "type-column--cell",
    },
    {
      field: "section",
      headerName: "Section",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      headerAlign: "left",
      align: "left",
    },
  ];

  return (
    <Box mt="50px">
      <Header
        title=""
        subtitle={`List of ${title} for our customers`}
      />
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
          backgroundColor: 'primary.main',
        }}
      >
        <DataGrid
          rows={dataServices}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ServicesList;