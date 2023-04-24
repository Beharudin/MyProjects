import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "./posts.css";
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

function Posts() {
  const [features, setFeatures] = useState([]);
  const [openEditFeatureModal, setOpenEditFeatureModal] = useState(false);
  const [openFeatureModal, setOpenFeatureModal] = useState(false);
  const [openAddFeatureModal, setOpenAddFeatureModal] = useState(false);
  const [featureName, setFeatureName] = useState("");
  const [featureDesc, setFeatureDesc] = useState("");
  const [featureIcon, setFeatureIcon] = useState("");
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
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        await axios.get("/features/").then((res) => {
          setFeatures(res.data.data);
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchFeatures();
  }, []);

  const addFeature = async (name, desc, icon) => {
    try {
      setLoading(true);
      await axios.post("/features/", {
        name: name,
        description: desc,
        icon: icon,
      });
      setError(false);
      setSuccess(true);
      setMsg("Feature added successfully!");
      await axios.get("/features/").then((res) => {
        setFeatures(res.data.data);
      });
      setLoading(false);
    } catch (error) {
      setSuccess(false);
      setError(true);
      setMsg("Something went wrong!");
      setLoading(false);
    }
  };

  const updateFeature = async (id, name, desc, icon) => {
    try {
      setLoading(true);
      await axios.patch(`/features/${id}`, {
        name: name,
        description: desc,
        icon: icon,
      });
      Swal.fire("Congratulations!", "Feature updated successfully!", "success");
      await axios.get("/features/").then((res) => {
        setFeatures(res.data.data);
      });
      setLoading(false);
    } catch (error) {
      Swal.fire("Sorry!", "Something went wrong!", "error");
      setLoading(false);
    }
  };
  const deleteFeature = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/features/${id}`);
      Swal.fire("Congratulations!", "Feature deleted successfully!", "success");
      await axios.get("/features/").then((res) => {
        setFeatures(res.data.data);
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

  const handleOpenFeatureModal = (id, name, desc, icon) => {
    setFeatureName(name);
    setFeatureDesc(desc);
    setFeatureIcon(icon);
    setModalId(id);
    setOpenFeatureModal(true);
  };
  const handleCloseFeatureModal = () => {
    setOpenFeatureModal(false);
  };

  const handleOpenEditFeatureModal = () => {
    setOpenFeatureModal(false);
    setOpenEditFeatureModal(true);
  };
  const handleCloseEditFeatureModal = () => {
    setOpenEditFeatureModal(false);
  };

  const handleOpenAddFeatureModal = () => {
    setOpenAddFeatureModal(true);
  };
  const handleCloseAddFeatureModal = () => {
    setOpenAddFeatureModal(false);
  };

  const addInitialValues = {
    featureType: "",
    featureDescription: "",
    featureIcon: "",
  };
  const editInitialValues = {
    featureType: featureName,
    featureDescription: featureDesc,
    featureIcon: featureIcon,
  };

  const featureInitSchema = Yup.object().shape({
    featureType: Yup.string().required("Feature name is required"),
    featureDescription: Yup.string().required(
      "Feature description is required"
    ),
    featureIcon: Yup.string().required("Feature icon is required"),
  });

  return (
    <div id="features" className="container">
      {/* {loading ? (
        <Loader />
      ) : features.length ? (
        <> */}
          <Box sx={{ display: "flex" }}>
            <div className="col col-xs-12 col-sm-3">
              <Header title="Posts" subtitle="Posts we provide" />
            </div>
            <div className="d-flex justify-content-end col col-xs-12 col-sm-8">
              <Link className="Link">
                <button
                  className="apply-btn"
                  onClick={handleOpenAddFeatureModal}
                >
                  Add New
                </button>
              </Link>
            </div>
          </Box>
          <div className="text-center">
            <div className="row p-5">
              {features
                ? features.map((data, index) => (
                    <div
                      key={`${data.feature_name}-${index}`}
                      className="col-xs-6 col-md-3"
                    >
                      <i className={data.feature_icon}></i>
                      <h3>{data.feature_name}</h3>
                      <p className="feature-text">{data.feature_desc}</p>
                      <Link className="Link">
                        <button
                          className="apply-btn mb-5"
                          onClick={() =>
                            handleOpenFeatureModal(
                              data.id,
                              data.feature_name,
                              data.feature_desc,
                              data.feature_icon
                            )
                          }
                        >
                          View more
                        </button>
                      </Link>
                    </div>
                  ))
                : "Loading..."}
            </div>
            <Modal open={openFeatureModal} onClose={handleCloseFeatureModal}>
              <Box sx={style}>
                <div className="d-flex justify-content-center text-center">
                  <li className={featureIcon} id="faIcon"></li>
                </div>
                <div className="service-desc">
                  <div className="text-center">
                    <h3>{featureName}</h3>
                  </div>
                  <p className="service-text">{featureDesc}</p>
                  <div className="linksDiv d-flex justify-content-center">
                    <button
                      className="apply-btn"
                      onClick={handleOpenEditFeatureModal}
                    >
                      Edit
                    </button>
                    <button
                      className="apply-btn"
                      onClick={() => {
                        handleCloseFeatureModal();
                        deleteFeature(modalId);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="apply-btn"
                      onClick={handleCloseFeatureModal}
                    >
                      close
                    </button>
                  </div>
                </div>
              </Box>
            </Modal>
            <Modal
              open={openEditFeatureModal}
              onClose={handleCloseEditFeatureModal}
            >
              <Box sx={style}>
                <Formik
                  enableReinitialize
                  initialValues={editInitialValues}
                  validationSchema={featureInitSchema}
                  validateOnMount={true}
                  onSubmit={(values) => {
                    updateFeature(
                      modalId,
                      values.featureType,
                      values.featureDescription,
                      values.featureIcon
                    );
                    setOpenEditFeatureModal(false);
                  }}
                >
                  {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                      <Typography variant="h6" gutterBottom>
                        Feature information
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="featureType"
                            name="featureType"
                            label="Feature Type"
                            fullWidth
                            variant="standard"
                            value={values.featureType}
                            onChange={handleChange("featureType")}
                            onBlur={handleBlur("featureType")}
                            sx={{ p: 2 }}
                          />
                          {touched.featureType && errors.featureType && (
                            <p style={{ color: "red" }}>{errors.featureType}</p>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            id="featureDescription"
                            name="featureDescription"
                            label="Feature Description"
                            value={values.featureDescription}
                            multiline
                            maxRows={10}
                            fullWidth
                            variant="standard"
                            onChange={handleChange("featureDescription")}
                            onBlur={handleBlur("featureDescription")}
                            sx={{ p: 2 }}
                          />
                          {touched.featureDescription &&
                            errors.featureDescription && (
                              <p style={{ color: "red" }}>
                                {errors.featureDescription}
                              </p>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            id="featureIcon"
                            name="featureIcon"
                            label="Feature Icon"
                            value={values.featureIcon}
                            multiline
                            maxRows={2}
                            fullWidth
                            variant="standard"
                            onChange={handleChange("featureIcon")}
                            onBlur={handleBlur("featureIcon")}
                            sx={{ p: 2 }}
                          />
                          {touched.featureIcon && errors.featureIcon && (
                            <p style={{ color: "red" }}>{errors.featureIcon}</p>
                          )}
                        </Grid>
                      </Grid>
                      <div className="service-desc">
                        <div className="linksDiv d-flex justify-content-center">
                          <button className="apply-btn" type="submit">
                            Update
                          </button>
                          <button
                            className="apply-btn"
                            onClick={handleCloseEditFeatureModal}
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
              open={openAddFeatureModal}
              onClose={handleCloseAddFeatureModal}
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
                  validationSchema={featureInitSchema}
                  validateOnMount={true}
                  onSubmit={(values, actions) => {
                    addFeature(
                      values.featureType,
                      values.featureDescription,
                      values.featureIcon
                    );
                    actions.resetForm();
                  }}
                >
                  {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                      <Typography variant="h6" gutterBottom>
                        Feature information
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="featureType"
                            name="featureType"
                            label="Feature Type"
                            fullWidth
                            variant="standard"
                            value={values.featureType}
                            onChange={handleChange("featureType")}
                            onBlur={handleBlur("featureType")}
                            sx={{ p: 2 }}
                          />
                          {touched.featureType && errors.featureType && (
                            <p style={{ color: "red" }}>{errors.featureType}</p>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            id="featureDescription"
                            name="featureDescription"
                            label="Loan Description"
                            value={values.featureDescription}
                            multiline
                            maxRows={10}
                            fullWidth
                            variant="standard"
                            onChange={handleChange("featureDescription")}
                            onBlur={handleBlur("featureDescription")}
                            sx={{ p: 2 }}
                          />
                          {touched.featureDescription &&
                            errors.featureDescription && (
                              <p style={{ color: "red" }}>
                                {errors.featureDescription}
                              </p>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            id="featureIcon"
                            name="featureIcon"
                            label="Feature Icon"
                            value={values.featureIcon}
                            multiline
                            maxRows={2}
                            fullWidth
                            variant="standard"
                            onChange={handleChange("featureIcon")}
                            onBlur={handleBlur("featureIcon")}
                            sx={{ p: 2 }}
                          />
                          {touched.featureIcon && errors.featureIcon && (
                            <p style={{ color: "red" }}>{errors.featureIcon}</p>
                          )}
                        </Grid>
                      </Grid>
                      <div className="service-desc">
                        <div className="linksDiv d-flex justify-content-center">
                          <button className="apply-btn">Save</button>
                          <button
                            className="apply-btn"
                            onClick={handleCloseAddFeatureModal}
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
        {/* </>
      ) : (
        <Error message="Something went wrong, please try again later!" />
      )} */}
    </div>
  );
}

export default Posts;
