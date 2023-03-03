import React, { useState } from "react";
import Header from "../../components/Header";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "./features.css";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";

function Features(props) {
  const [openEditFeatureModal, setOpenEditFeatureModal] = useState(false);
  const [openFeatureModal, setOpenFeatureModal] = useState(false);
  const [openAddFeatureModal, setOpenAddFeatureModal] = useState(false);
  const [featureName, setFeatureName] = useState("");
  const [featureDesc, setFeatureDesc] = useState("");
  const [featureIcon, setFeatureIcon] = useState("");

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

  const handleOpenFeatureModal = (name, desc, icon) => {
    setFeatureName(name);
    setFeatureDesc(desc);
    setFeatureIcon(icon);
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
  };
  const editInitialValues = {
    featureType: featureName,
    featureDescription: featureDesc,
  };

  const featureInitSchema = Yup.object().shape({
    featureType: Yup.string().required("Feature name is required"),
    featureDescription: Yup.string().required(
      "Feature description is required"
    ),
  });

  return (
    <div id="features" className="container">
      <Box sx={{ display: "flex" }}>
        <div className="col col-xs-12 col-sm-3">
          <Header title="Features" subtitle="Features we provide" />
        </div>
        <div className="d-flex justify-content-end col col-xs-12 col-sm-8">
          <Link className="Link">
            <button className="apply-btn" onClick={handleOpenAddFeatureModal}>
              Add New
            </button>
          </Link>
        </div>
      </Box>
      <div className="text-center">
        <div className="section-title">
          <h2>Features</h2>
        </div>

        <div className="row p-5">
          {props.data
            ? props.data.map((data, index) => (
                <div
                  key={`${data.title}-${index}`}
                  className="col-xs-6 col-md-3"
                >
                  <i className={data.icon}></i>
                  <h3>{data.title}</h3>
                  <p className="feature-text">{data.text}</p>
                  <Link className="Link">
                    <button
                      className="apply-btn mb-5"
                      onClick={() =>
                        handleOpenFeatureModal(data.name, data.text, data.icon)
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
                <Link className="Link">
                  <button
                    className="apply-btn"
                    onClick={handleOpenEditFeatureModal}
                  >
                    Edit
                  </button>
                </Link>
                <Link className="Link">
                  <button className="apply-btn">Delete</button>
                </Link>
                <Link className="Link">
                  <button
                    className="apply-btn"
                    onClick={handleCloseFeatureModal}
                  >
                    close
                  </button>
                </Link>
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
                console.log(values);
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
                  </Grid>
                </Form>
              )}
            </Formik>
            <div className="service-desc">
              <div className="linksDiv d-flex justify-content-center">
                <Link className="Link">
                  <button className="apply-btn">Save</button>
                </Link>
                <Link className="Link">
                  <button
                    className="apply-btn"
                    onClick={handleCloseEditFeatureModal}
                  >
                    close
                  </button>
                </Link>
              </div>
            </div>
          </Box>
        </Modal>
        <Modal open={openAddFeatureModal} onClose={handleCloseAddFeatureModal}>
          <Box sx={style}>
            <Formik
              enableReinitialize
              initialValues={addInitialValues}
              validationSchema={featureInitSchema}
              validateOnMount={true}
              onSubmit={(values) => {
                console.log(values);
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
                  </Grid>
                </Form>
              )}
            </Formik>
            <div className="service-desc">
              <div className="linksDiv d-flex justify-content-center">
                <Link className="Link">
                  <button className="apply-btn">Save</button>
                </Link>
                <Link className="Link">
                  <button
                    className="apply-btn"
                    onClick={handleCloseAddFeatureModal}
                  >
                    close
                  </button>
                </Link>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Features;
