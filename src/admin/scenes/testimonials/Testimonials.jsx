import { ArrowForwardIos } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import Notifications from "../../../components/common/Notifications";
import {
  createTestimonialData,
  deleteTestimonialData,
  updateTestimonialData,
} from "../../../store/testimonial/testimonialActions";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { showNotificationMessage } from "../../../store/uiSlice";

const Testimonials = () => {
  const [openEditTestimonialsModal, setOpenEditTestimonialsModal] =
    useState(false);
  const [openAddTestimonialsModal, setOpenAddTestimonialsModal] =
    useState(false);
  const [modalClientName, setModalClientName] = useState("");
  const [modalClientComment, setModalClientComment] = useState("");
  const [modalClientImg, setModalClientImg] = useState("");
  const [modalId, setModalId] = useState();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.testimonial.testimonialsList);
  const notification = useSelector((state) => state.ui.notification);

  const addTestimonial = async (name, cmt) => {
    let data = {
      name,
      comment: cmt,
    };
    if (file) {
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append("name", filename);
      formData.append("file", file);
      data.img = filename;

      // upload image
      try {
        setLoading(true);
        await axios.post("/upload/", formData);
        setLoading(false);
      } catch (error) {
        Swal.fire("Sorry!", "Failed to upload image!", "error");
        setLoading(false);
      }
    }

    try {
      setLoading(true);
      dispatch(createTestimonialData(data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const updateTestimonial = async (id, name, cmt) => {
    let data = {
      id,
      name,
      comment: cmt,
    };
    if (file) {
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append("name", filename);
      formData.append("file", file);
      data.img = filename;

      // upload image
      try {
        setLoading(true);
        await axios.post("/upload/", formData);
        setLoading(false);
      } catch (error) {
        Swal.fire("Sorry!", "Failed to upload image!", "error");
        setLoading(false);
      }
    }

    try {
      setLoading(true);
      dispatch(updateTestimonialData(data));
      Swal.fire(
        "Congratulations!",
        "Testimonial updated successfully!",
        "success"
      );
      setLoading(false);
    } catch (error) {
      Swal.fire("Sorry!", "Something went wrong!", "error");
      setLoading(false);
    }
  };
  const deleteTestimonial = async (id) => {
    try {
      setLoading(true);
      dispatch(deleteTestimonialData(id));
      Swal.fire(
        "Congratulations!",
        "Testimonials deleted successfully!",
        "success"
      );
      setLoading(false);
    } catch (error) {
      Swal.fire("Sorry!", "Something went wrong!", "error");
      setLoading(false);
    }
  };

  const saveFile = (e) => {
    setFile(e.target.files[0]);
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

  const handleOpenEditTestimonialsModal = (id, name, comment, img) => {
    setModalClientName(name);
    setModalClientComment(comment);
    setModalClientImg(img);
    setModalId(id);
    setOpenEditTestimonialsModal(true);
  };
  const handleCloseEditTestimonialsModal = () => {
    setOpenEditTestimonialsModal(false);
  };

  const editInitialValues = {
    clientComment: modalClientComment,
    clientName: modalClientName,
    clientImg: modalClientImg,
  };

  const initSchema = Yup.object().shape({
    clientComment: Yup.string().required("Client comment is required"),
    clientName: Yup.string().required("Client name is required"),
    clientImg: Yup.string().required("Client photo is required"),
  });

  const handleOpenAddTestimonialsModal = () => {
    dispatch(
      showNotificationMessage({
        open: false,
      })
    );
    setOpenAddTestimonialsModal(true);
  };
  const handleCloseAddTestimonialsModal = () => {
    setOpenAddTestimonialsModal(false);
  };

  const addInitialValues = {
    clientComment: "",
    clientName: "",
    clientImg: "",
  };

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : data ? (
        <>
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
            ? data.map((data, index) => (
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
                        color: "black",
                      }}
                      onClick={() =>
                        handleOpenEditTestimonialsModal(
                          data.id,
                          data.name,
                          data.comment,
                          data.img
                        )
                      }
                    >
                      <div className="m-1">
                        <img
                          className="rounded-circle"
                          src={
                            `${process.env.REACT_APP_BACKEND_BASE_URL}/images/` +
                            data.img
                          }
                          alt=""
                          style={{ width: "100px", height: "100px" }}
                        />
                      </div>
                      <Box sx={{ width: "100%", marginLeft: "20px" }}>
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
                            {data.name}
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
                            {data.comment}
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
                    values.clientComment,
                    values.clientImg
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
                      <Grid item xs={12} sm={6}>
                        <Button
                          variant="contained"
                          component="label"
                          size="small"
                          onChange={handleChange("clientImg")}
                          onBlur={handleBlur("clientImg")}
                          color="common"
                        >
                          Client image
                          <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            hidden
                            name="clientImg"
                            onChange={saveFile}
                          />
                        </Button>
                        <div>
                          {errors.clientImg && touched.clientImg && (
                            <p style={{ color: "red" }}>{errors.clientImg}</p>
                          )}
                        </div>
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
              {notification && (
                <Notifications
                  type={notification.type}
                  message={notification.message}
                />
              )}

              <Formik
                enableReinitialize
                initialValues={addInitialValues}
                validationSchema={initSchema}
                validateOnMount={true}
                onSubmit={(values, actions) => {
                  addTestimonial(
                    values.clientName,
                    values.clientComment,
                    values.clientImg
                  );
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
                      <Grid item xs={12} sm={6}>
                        <Button
                          variant="contained"
                          component="label"
                          size="small"
                          onChange={handleChange("clientImg")}
                          onBlur={handleBlur("clientImg")}
                          color="common"
                        >
                          Client image
                          <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            hidden
                            name="clientImg"
                            onChange={saveFile}
                          />
                        </Button>
                        <div>
                          {errors.clientImg && touched.clientImg && (
                            <p style={{ color: "red" }}>{errors.clientImg}</p>
                          )}
                        </div>
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
};

export default Testimonials;
