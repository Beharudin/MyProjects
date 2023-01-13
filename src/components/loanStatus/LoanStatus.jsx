import axios from "axios";
import bpmnJs from "bpmn-js";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BASE_CAMADPTR_URL, cookies } from "../..";
import { uiActions } from "../../store/ui";

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

      console.log("warnings!", warnings);
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
        style={{ position: "absolute", width: "100%", height: "100%" }}
        id="diagramContainer"
      ></div>
    );
  } catch (err) {
    console.log("error rendering", err);
  }
};
export default LoanStatus;
