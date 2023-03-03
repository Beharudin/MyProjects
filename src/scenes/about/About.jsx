import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./about.css";
import { useState } from "react";
import Header from "../../components/Header";

function About(props) {
  const [openEditAboutModal, setOpenEditAboutModal] = useState(false);
  const [modalImg, setModalImg] = useState("");
  const [modalDesc, setModalDesc] = useState("");
  const [modalOffers, setModalOffers] = useState([]);

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

  useEffect(() => {
    setModalImg("../assets/about.jpg");
    setModalDesc(props.data.paragraph);
    setModalOffers(props.data.Why);
  }, []);

  const handleOpenEditAboutModal = () => {
    setOpenEditAboutModal(true);
  };
  const handleCloseEditAboutModal = () => {
    setOpenEditAboutModal(false);
  };

  const initialValues = {
    aboutDescription: modalDesc,
    aboutOffers: modalOffers,
    aboutImg: modalImg,
  };

  const aboutInitSchema = Yup.object().shape({
    aboutOffers: Yup.array()
      .of(Yup.string())
      .required("About type is required"),
    aboutDescription: Yup.string().required("About description is required"),
    aboutImg: Yup.mixed().required("About image is required"),
  });
  return (
    <div id="about">
        <div className="d-flex">
          <div className="col col-xs-12 col-sm-3">
            <Header title="About Us" subtitle="About our services we provide" />
          </div>
          <div className="editDiv d-flex justify-content-end col col-xs-8">
            <button onClick={handleOpenEditAboutModal}>Edit</button>
          </div>
        </div>
      <div className="container">
        <div className="row">
          <div className="LeftDiv col-xs-12 col-md-6">
            <img src="../assets/about.jpg" className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About Us</h2>
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
              <h3>What We Offer?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why.map((data, index) => (
                          <li key={`${data}-${index}`}>{data}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal open={openEditAboutModal} onClose={handleCloseEditAboutModal}>
          <Box sx={style}>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={aboutInitSchema}
              validateOnMount={true}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Typography variant="h6" gutterBottom>
                    About information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="aboutDescription"
                        name="aboutDescription"
                        label="Description"
                        value={values.aboutDescription}
                        multiline
                        maxRows={10}
                        fullWidth
                        variant="standard"
                        onChange={handleChange("aboutDescription")}
                        onBlur={handleBlur("aboutDescription")}
                        sx={{ p: 2 }}
                      />
                      {touched.aboutDescription && errors.aboutDescription && (
                        <p style={{ color: "red" }}>
                          {errors.aboutDescription}
                        </p>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="aboutOffers"
                        name="aboutOffers"
                        label="Offers"
                        fullWidth
                        multiline
                        maxRows={5}
                        variant="standard"
                        value={values.aboutOffers}
                        onChange={handleChange("aboutOffers")}
                        onBlur={handleBlur("aboutOffers")}
                        sx={{ p: 2 }}
                      />
                      {touched.aboutOffers && errors.aboutOffers && (
                        <p style={{ color: "red" }}>{errors.aboutOffers}</p>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        component="label"
                        size="small"
                        onChange={handleChange("aboutImg")}
                        onBlur={handleBlur("aboutImg")}
                        color="common"
                      >
                        About image
                        <input type="file" hidden name="aboutImg" />
                      </Button>
                      <div>
                        {errors.aboutImg && touched.aboutImg && (
                          <p style={{ color: "red" }}>{errors.aboutImg}</p>
                        )}
                      </div>
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
                    onClick={handleCloseEditAboutModal}
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

export default About;
