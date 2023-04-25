const { parse } = require("csv-parse/sync"); //include
const fs = require("fs");
const express = require("express");
const axios = require("axios");

const app = express();
const headers = { "Content-Type": "application/json" };

//loading data from the file
var global_data = fs.readFileSync("./csv/branchlist.csv").toString();

//the dataset
const input = global_data;

//calling the npm package and save to records
const records = parse(input, {
  columns: true,
  skip_empty_lines: true,
});

//filter unique value
function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

//map the output from csv-parse to the column
const branches = records.map((rec) =>
  rec["BRANCH_NAME"].replace(/\s+/g, "").replace("-", "").replace("'", "")
);
const districts = records
  .map((rec) => rec["DISTRICT_NAME"].replace(/\s+/g, ""))
  .filter(onlyUnique);

app.get("/add/groups/", (req, res) => {
  console.log("branches: ", branches);
  console.log("districts: ", districts);
  try {
    const url = `http://localhost:8080/engine-rest/group/create`;
    districts.map(async (district) => {
      if (district) {
        body = {
          id: district,
          name: district,
          type: "district",
        };
        await axios.post(url, body, {
          headers,
        });
      }
    });
    branches.map(async (branch) => {
      if (branch) {
        body = {
          id: branch,
          name: branch,
          type: "branch",
        };
        await axios.post(url, body, {
          headers,
        });
      }
    });
    return res.status(400).json({
      status: 1,
      message: "Groups are successfully added",
    });
  } catch (error) {
    return res.status(400).json({
      status: 0,
      message: error,
    });
  }
});

app.get("/delete/groups/", (req, res) => {
  try {
    districts.map(async (district) => {
      if (district) {
        await axios.delete(`http://localhost:8080/engine-rest/group/${district}`, {
          headers,
        });
      }
    });
    branches.map(async (branch) => {
      if (branch) {
        await axios.delete(`http://localhost:8080/engine-rest/group/${branch}`, {
          headers,
        });
      }
    });
    return res.status(400).json({
      status: 1,
      message: "Groups are successfully deleted",
    });
  } catch (error) {
    return res.status(400).json({
      status: 0,
      message: error,
    });
  }
});

const port = 3005;
app.listen(port, () => {
  console.log("SERVER RUNNING ON PORT " + port);
});
