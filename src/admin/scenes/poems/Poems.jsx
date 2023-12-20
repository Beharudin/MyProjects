import { Box, Grid, Modal, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import Notifications from "../../../components/common/Notifications";
import {
  createPoemData,
  deletePoemData,
  updatePoemData,
} from "../../../store/poem/poemActions";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import "./poems.css";
import { showNotificationMessage } from "../../../store/uiSlice";

function Poems() {
  const [openEditPoemModal, setOpenEditPoemModal] = useState(false);
  const [openPoemModal, setOpenPoemModal] = useState(false);
  const [openAddPoemModal, setOpenAddPoemModal] = useState(false);
  const [poemTopic, setPoemTopic] = useState("");
  const [poemBody, setPoemBody] = useState("");
  const [modalId, setModalId] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const poems = useSelector((state) => state.poem.poemsList);
  const notification = useSelector((state) => state.ui.notification);

  const addPoem = async (topic, body) => {
    try {
      setLoading(true);
      dispatch(
        createPoemData({
          topic,
          body,
        })
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const updatePoem = async (id, topic, body) => {
    try {
      setLoading(true);
      dispatch(updatePoemData({ id, topic, body }));
      Swal.fire("Congratulations!", "Poem updated successfully!", "success");
      setLoading(false);
    } catch (error) {
      Swal.fire("Sorry!", "Something went wrong!", "error");
      setLoading(false);
    }
  };
  const deletePoem = async (id) => {
    try {
      setLoading(true);
      dispatch(deletePoemData(id));
      Swal.fire("Congratulations!", "Poem deleted successfully!", "success");
      setLoading(false);
    } catch (error) {
      Swal.fire("Sorry!", "Something went wrong!", "error");
      setLoading(false);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleOpenPoemModal = (id, name, desc, icon) => {
    setPoemTopic(name);
    setPoemBody(desc);
    setModalId(id);
    setOpenPoemModal(true);
  };
  const handleClosePoemModal = () => {
    setOpenPoemModal(false);
  };

  const handleOpenEditPoemModal = () => {
    setOpenPoemModal(false);
    setOpenEditPoemModal(true);
  };
  const handleCloseEditPoemModal = () => {
    setOpenEditPoemModal(false);
  };

  const handleOpenAddPoemModal = () => {
    dispatch(
      showNotificationMessage({
        open: false,
      })
    );
    setOpenAddPoemModal(true);
  };
  const handleCloseAddPoemModal = () => {
    setOpenAddPoemModal(false);
  };

  const addInitialValues = {
    poemTopic: "",
    poemBody: "",
  };
  const editInitialValues = {
    poemTopic: poemTopic,
    poemBody: poemBody,
  };

  const poemInitSchema = Yup.object().shape({
    poemTopic: Yup.string().required("Poem topic is required"),
    poemBody: Yup.string().required("Poem body is required"),
  });

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : poems.length ? (
        <>
          <Box sx={{ display: "flex" }}>
            <div className="col col-xs-12 col-sm-3">
              <Header title="Poems" subtitle="Poems we provide" />
            </div>
            <div className="d-flex justify-content-end col col-xs-12 col-sm-8">
              <Link className="Link">
                <button className="apply-btn" onClick={handleOpenAddPoemModal}>
                  Add New
                </button>
              </Link>
            </div>
          </Box>
          <div className="text-center">
            <div className="row p-5">
              {poems
                ? poems.map((data, index) => (
                    <div
                      key={`${data.topic}-${index}`}
                      className="col-xs-6 col-md-3"
                    >
                      <h3>{data.topic}</h3>
                      <div className="poem-div mt-4 mb-4">
                        {data.body.split("#").map((paragraph) =>
                          paragraph.split(",").map((line) => (
                            <p className="poem-text m-0" key={line}>
                              {line}
                            </p>
                          ))
                        )}
                      </div>
                      <Link className="Link">
                        <button
                          className="apply-btn mb-5"
                          onClick={() =>
                            handleOpenPoemModal(data.id, data.topic, data.body)
                          }
                        >
                          View more
                        </button>
                      </Link>
                    </div>
                  ))
                : "Loading..."}
            </div>
            <Modal open={openPoemModal} onClose={handleClosePoemModal}>
              <Box sx={style}>
                <div className="poem-desc">
                  <div className="text-center">
                    <h3>{poemTopic}</h3>
                  </div>
                  <p className="poem-text">{poemBody}</p>
                  <div className="linksDiv d-flex justify-content-center">
                    <button
                      className="apply-btn"
                      onClick={handleOpenEditPoemModal}
                    >
                      Edit
                    </button>
                    <button
                      className="apply-btn"
                      onClick={() => {
                        handleClosePoemModal();
                        deletePoem(modalId);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="apply-btn"
                      onClick={handleClosePoemModal}
                    >
                      close
                    </button>
                  </div>
                </div>
              </Box>
            </Modal>
            <Modal open={openEditPoemModal} onClose={handleCloseEditPoemModal}>
              <Box sx={style}>
                <Formik
                  enableReinitialize
                  initialValues={editInitialValues}
                  validationSchema={poemInitSchema}
                  validateOnMount={true}
                  onSubmit={(values) => {
                    updatePoem(modalId, values.poemTopic, values.poemBody);
                    setOpenEditPoemModal(false);
                  }}
                >
                  {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                      <Typography variant="h6" gutterBottom>
                        Poem information
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="poemTopic"
                            name="poemTopic"
                            label="Poem Topic"
                            fullWidth
                            variant="standard"
                            value={values.poemTopic}
                            onChange={handleChange("poemTopic")}
                            onBlur={handleBlur("poemTopic")}
                            sx={{ p: 2 }}
                          />
                          {touched.poemTopic && errors.poemTopic && (
                            <p style={{ color: "red" }}>{errors.poemTopic}</p>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            id="poemBody"
                            name="poemBody"
                            label="Poem Body"
                            value={values.poemBody}
                            multiline
                            maxRows={10}
                            fullWidth
                            variant="standard"
                            onChange={handleChange("poemBody")}
                            onBlur={handleBlur("poemBody")}
                            sx={{ p: 2 }}
                          />
                          {touched.poemBody && errors.poemBody && (
                            <p style={{ color: "red" }}>{errors.poemBody}</p>
                          )}
                        </Grid>
                      </Grid>
                      <div className="poem-desc">
                        <div className="linksDiv d-flex justify-content-center">
                          <button className="apply-btn" type="submit">
                            Update
                          </button>
                          <button
                            className="apply-btn"
                            onClick={handleCloseEditPoemModal}
                          >
                            close
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Modal>
            <Modal open={openAddPoemModal} onClose={handleCloseAddPoemModal}>
              <Box sx={style}>
                {notification && (
                  <Notifications
                    type={notification.type}
                    message={notification.message}
                  />
                )}
                <Formik
                  enableReinitialize
                  initialValues={addInitialValues}
                  validationSchema={poemInitSchema}
                  validateOnMount={true}
                  onSubmit={(values, actions) => {
                    addPoem(values.poemTopic, values.poemBody, values.PoemIcon);
                    actions.resetForm();
                  }}
                >
                  {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                      <Typography variant="h6" gutterBottom>
                        Poem information
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="poemTopic"
                            name="poemTopic"
                            label="Poem Topic"
                            fullWidth
                            variant="standard"
                            value={values.poemTopic}
                            onChange={handleChange("poemTopic")}
                            onBlur={handleBlur("poemTopic")}
                            sx={{ p: 2 }}
                          />
                          {touched.poemTopic && errors.poemTopic && (
                            <p style={{ color: "red" }}>{errors.poemTopic}</p>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            id="poemBody"
                            name="poemBody"
                            label="Poem Body"
                            value={values.poemBody}
                            multiline
                            maxRows={10}
                            fullWidth
                            variant="standard"
                            onChange={handleChange("poemBody")}
                            onBlur={handleBlur("poemBody")}
                            sx={{ p: 2 }}
                          />
                          {touched.poemBody && errors.poemBody && (
                            <p style={{ color: "red" }}>{errors.poemBody}</p>
                          )}
                        </Grid>
                      </Grid>
                      <div className="poem-desc">
                        <div className="linksDiv d-flex justify-content-center">
                          <button className="apply-btn">Save</button>
                          <button
                            className="apply-btn"
                            onClick={handleCloseAddPoemModal}
                          >
                            close
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Modal>
          </div>
        </>
      ) : notification ? (
        <Notifications
          type={notification.type}
          message={notification.message}
        />
      ) : (
        "Something went wrong, please try again later!"
      )}
    </div>
  );
}

export default Poems;
