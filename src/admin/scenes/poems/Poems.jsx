import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "./poems.css";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { Close } from "@mui/icons-material";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

function Poems() {
  const [poems, setPoems] = useState([]);
  const [openEditPoemModal, setOpenEditPoemModal] = useState(false);
  const [openPoemModal, setOpenPoemModal] = useState(false);
  const [openAddPoemModal, setOpenAddPoemModal] = useState(false);
  const [poemTopic, setPoemTopic] = useState("");
  const [poemBody, setPoemBody] = useState("");
  const [modalId, setModalId] = useState();
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  // if (!user) {
  //   setLoading(true);
  //   window.location.href = "/admin/login";
  // } else if (user.role !== "admin") {
  //   setLoading(true);
  //   window.location.href = "/admin/login";
  // }

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        setLoading(true);
        await axios.get("http://localhost:3001/api/poems/").then((res) => {
          setPoems(res.data.data);
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchPoems();
  }, []);

  const addPoem = async (topic, body) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:3001/api/poems/", {
        topic: topic,
        body: body,
      });
      setError(false);
      setSuccess(true);
      setMsg("Poem added successfully!");
      await axios.get("http://localhost:3001/api/poems/").then((res) => {
        setPoems(res.data.data);
      });
      setLoading(false);
    } catch (error) {
      setSuccess(false);
      setError(true);
      setMsg("Something went wrong!");
      setLoading(false);
    }
  };

  const updatePoem = async (id, topic, body) => {
    try {
      setLoading(true);
      await axios.patch(`http://localhost:3001/api/poems/${id}`, {
        topic: topic,
        body: body,
      });
      Swal.fire("Congratulations!", "Poem updated successfully!", "success");
      await axios.get("http://localhost:3001/api/poems/").then((res) => {
        setPoems(res.data.data);
      });
      setLoading(false);
    } catch (error) {
      Swal.fire("Sorry!", "Something went wrong!", "error");
      setLoading(false);
    }
  };
  const deletePoem = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3001/api/poems/${id}`);
      Swal.fire("Congratulations!", "Poem deleted successfully!", "success");
      await axios.get("http://localhost:3001/api/poems/").then((res) => {
        setPoems(res.data.data);
      });
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
    <div id="poems" className="container">
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
                {error && (
                  <div
                    className="alert alert-danger d-flex justify-content-between"
                    role="alert"
                  >
                    {msg}
                    <IconButton onClick={() => setError(false)} sx={{ p: 0 }}>
                      {<Close />}
                    </IconButton>
                  </div>
                )}
                {success && (
                  <div
                    className="alert alert-success d-flex justify-content-between"
                    role="alert"
                  >
                    {msg}
                    <IconButton onClick={() => setSuccess(false)} sx={{ p: 0 }}>
                      {<Close />}
                    </IconButton>
                  </div>
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
      ) : (
        <Error message="Something went wrong, please try again later!" />
      )}
    </div>
  );
}

export default Poems;
