import { Box } from "@mui/system";
import axios from "axios";
import bpmnJs from "bpmn-js";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BASE_CAMADPTR_URL, cookies } from "../..";
import { uiActions } from "../../store/ui";
import Legend from "../legend/Legend";

const LoanStatus = () => {
  const userId = cookies.get("userId");
  const dispatch = useDispatch();

  const fetchDiagram = async () => {
    try {
      const viewer = new bpmnJs({
        container: "#diagramContainer",
      });

      dispatch(uiActions.startLoad());
      const resp = await axios.get(
        `${BASE_CAMADPTR_URL}/getProcessDiagram?customerId=${userId}`
      );
      const { warnings } = await viewer.importXML(resp.data);
      viewer.get("canvas").zoom("fit-viewport");

      const resp2 = await axios.get(
        `${BASE_CAMADPTR_URL}/getLatestTaskForCustomer?customerId=${userId}`
      );
      document.querySelector(
        `[data-element-id=${resp2.data.taskDefId}]`
      ).children[0].children[0].style.fill = "rgb(252, 193, 2)";

      const resp3 = await axios.get(
        `${BASE_CAMADPTR_URL}/getFinishedTasksForCustomer?customerId=${userId}`
      );
      resp3.data.map(
        (el) =>
          (document.querySelector(
            `[data-element-id=${el.taskDefId}]`
          ).children[0].children[0].style.fill = "rgb(100, 240, 95)")
      );

      dispatch(uiActions.stopLoad());
    } catch (err) {
      dispatch(uiActions.stopLoad());
      const msg = err.response?.data?.error;
      dispatch(
        uiActions.notif({
          type: "error",
          msg,
        })
      );
      console.log(err);
    }
  };
  useEffect(() => {
    fetchDiagram();
  }, [dispatch]);
  try {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        id="diagramContainer"
      >
        <Box id="canvas" sx={{ order: 1 }}></Box>
        <Legend />
      </div>
    );
  } catch (err) {
    console.log("error rendering", err);
  }
};
export default LoanStatus;
