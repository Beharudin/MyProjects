import React from "react";
import { Box, Grid, IconButton, Modal, Paper, TextField } from "@mui/material";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";
import { Link, NavLink } from "react-router-dom";
import { ArrowForwardIos } from "@mui/icons-material";
import "./testimonials.css";
import { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { Close } from "@mui/icons-material";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

const Testimonials = () => {
  const [openEditTestimonialsModal, setOpenEditTestimonialsModal] = useState(
    false
  );
  const [openAddTestimonialsModal, setOpenAddTestimonialsModal] = useState(
    false
  );
  const [editModalClientName, seteditModalClientName] = useState("");
  const [editModalClientComment, seteditModalClientComment] = useState("");
  const [data, setData] = useState([]);
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
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/testimonials/");
        setData(res.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addTestimonial = async (name, cmt) => {
    try {
      setLoading(true);
      await axios.post("/testimonials/", {
        username: name,
        comment: cmt,
      });
      setError(false);
      setSuccess(true);
      setMsg("Testimonial added successfully!");
      await axios.get("/testimonials/").then((res) => {
        setData(res.data.data);
      });
      setLoading(false);
    } catch (error) {
      setSuccess(false);
      setError(true);
      setMsg("Something went wrong!");
      setLoading(false);
    }
  };

  const updateTestimonial = async (id, name, cmt) => {
    try {
      setLoading(true);
      await axios.patch(`/testimonials/${id}`, {
        username: name,
        comment: cmt,
      });
      Swal.fire(
        "Congratulations!",
        "Testimonial updated successfully!",
        "success"
      );
      await axios.get("/testimonials/").then((res) => {
        setData(res.data.data);
      });
      setLoading(false);
    } catch (error) {
      Swal.fire("Sorry!", "Something went wrong!", "error");
      setLoading(false);
    }
  };
  const deleteTestimonial = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/testimonials/${id}`);
      Swal.fire(
        "Congratulations!",
        "Testimonials deleted successfully!",
        "success"
      );
      await axios.get("/testimonials/").then((res) => {
        setData(res.data.data);
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

  const handleOpenEditTestimonialsModal = (id, name, comment) => {
    seteditModalClientName(name);
    seteditModalClientComment(comment);
    setModalId(id);
    setOpenEditTestimonialsModal(true);
  };
  const handleCloseEditTestimonialsModal = () => {
    setOpenEditTestimonialsModal(false);
  };

  const editInitialValues = {
    clientComment: editModalClientComment,
    clientName: editModalClientName,
  };

  const initSchema = Yup.object().shape({
    clientComment: Yup.string().required("Client comment is required"),
    clientName: Yup.string().required("Client name is required"),
  });

  const handleOpenAddTestimonialsModal = () => {
    setOpenAddTestimonialsModal(true);
  };
  const handleCloseAddTestimonialsModal = () => {
    setOpenAddTestimonialsModal(false);
  };

  const addInitialValues = {
    clientComment: "",
    clientName: "",
  };

  return (
    <Box m="20px">
      {/* {loading ? (
        <Loader />
      ) : data.length ? (
        <> */}
          <Box sx={{ display: "flex" }}>
            <div className="col col-xs-12 col-sm-3">
              <Header title="Testimonials" subtitle="What our clients say" />
            </div>
            <div className="d-flex justify-content-end col col-xs-12 col-sm-8">
              <Link className="Link">
                <button
                  className="apply-btn"
                  onClick={handleOpenAddTestimonialsModal}
                >
                  Add New
                </button>
              </Link>
            </div>
          </Box>

          {data
            ? data.map((d, index) => (
                <Paper
                  variant="outlined"
                  sx={{
                    my: { xs: 2, md: 1 },
                    mx: { xs: 1, md: 2 },
                    p: { md: 2 },
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    width: { xs: "100%", md: "80%" },
                  }}
                >
                  <NavLink className="nav-link">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                      }}
                      onClick={() =>
                        handleOpenEditTestimonialsModal(
                          d.id,
                          d.username,
                          d.comment
                        )
                      }
                    >
                      <Box sx={{ width: "100%" }}>
                        <h1 className="user">
                          <Typography
                            variant="h4"
                            sx={{
                              zIndex: "2",
                              background: "#FFF",
                              display: "inline",
                              position: "relative",
                              padding: "0 15px",
                            }}
                          >
                            {d.username}
                          </Typography>
                        </h1>
                        <div className="userMessage">
                          <Typography
                            sx={{
                              zIndex: "2",
                              background: "#FFF",
                              display: "inline",
                              position: "relative",
                              padding: "0 15px",
                            }}
                          >
                            {d.comment}
                          </Typography>
                        </div>
                      </Box>
                      <div className="col col-1  d-flex justify-content-end">
                        <ArrowForwardIos sx={{ color: "#bebebe" }} />
                      </div>
                    </div>
                  </NavLink>
                </Paper>
              ))
            : "loading"}

          <Modal
            open={openEditTestimonialsModal}
            onClose={handleCloseEditTestimonialsModal}
          >
            <Box sx={style}>
              <Formik
                enableReinitialize
                initialValues={editInitialValues}
                validationSchema={initSchema}
                validateOnMount={true}
                onSubmit={(values) => {
                  updateTestimonial(
                    modalId,
                    values.clientName,
                    values.clientComment
                  );
                  setOpenEditTestimonialsModal(false);
                }}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form>
                    <Typography variant="h6" gutterBottom>
                      Edit Testimonals
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="clientName"
                          name="clientName"
                          label="Client name"
                          fullWidth
                          multiline
                          maxRows={5}
                          variant="standard"
                          value={values.clientName}
                          onChange={handleChange("clientName")}
                          onBlur={handleBlur("clientName")}
                          sx={{ p: 2 }}
                        />
                        {touched.clientName && errors.clientName && (
                          <p style={{ color: "red" }}>{errors.clientName}</p>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="clientComment"
                          name="clientComment"
                          label="Client comment"
                          value={values.clientComment}
                          multiline
                          maxRows={10}
                          fullWidth
                          variant="standard"
                          onChange={handleChange("clientComment")}
                          onBlur={handleBlur("clientComment")}
                          sx={{ p: 2 }}
                        />
                        {touched.clientComment && errors.clientComment && (
                          <p style={{ color: "red" }}>{errors.clientComment}</p>
                        )}
                      </Grid>
                    </Grid>
                    <div className="service-desc">
                      <div className="linksDiv d-flex justify-content-center">
                        <button className="apply-btn">Update</button>
                        <button
                          className="apply-btn"
                          onClick={() => {
                            handleCloseEditTestimonialsModal();
                            deleteTestimonial(modalId);
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className="apply-btn"
                          onClick={handleCloseEditTestimonialsModal}
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

          <Modal
            open={openAddTestimonialsModal}
            onClose={handleCloseAddTestimonialsModal}
          >
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
                validationSchema={initSchema}
                validateOnMount={true}
                onSubmit={(values, actions) => {
                  addTestimonial(values.clientName, values.clientComment);
                  actions.resetForm();
                }}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form>
                    <Typography variant="h6" gutterBottom>
                      Add Testimonals
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="clientName"
                          name="clientName"
                          label="Client name"
                          fullWidth
                          multiline
                          maxRows={5}
                          variant="standard"
                          value={values.clientName}
                          onChange={handleChange("clientName")}
                          onBlur={handleBlur("clientName")}
                          sx={{ p: 2 }}
                        />
                        {touched.clientName && errors.clientName && (
                          <p style={{ color: "red" }}>{errors.clientName}</p>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="clientComment"
                          name="clientComment"
                          label="Client comment"
                          value={values.clientComment}
                          multiline
                          maxRows={10}
                          fullWidth
                          variant="standard"
                          onChange={handleChange("clientComment")}
                          onBlur={handleBlur("clientComment")}
                          sx={{ p: 2 }}
                        />
                        {touched.clientComment && errors.clientComment && (
                          <p style={{ color: "red" }}>{errors.clientComment}</p>
                        )}
                      </Grid>
                    </Grid>
                    <div className="service-desc">
                      <div className="linksDiv d-flex justify-content-center">
                        <button className="apply-btn">Save</button>
                        <button
                          className="apply-btn"
                          onClick={handleCloseAddTestimonialsModal}
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
        {/* </>
      ) : (
        <Error message="Something went wrong, please try again later!" />
      )} */}
    </Box>
  );
};

export default Testimonials;
