import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import "./about.css";
import { useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

function About() {
  const [openEditAboutModal, setOpenEditAboutModal] = useState(false);
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user.length) {
    setLoading(true);
    window.location.href = "/admin/login";
  }

  useEffect(() => {
    const getAbout = async () => {
      try {
        setLoading(true);
        await axios.get("http://localhost:3001/api/about").then((res) => {
          setData(res.data.data[0]);
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getAbout();
  }, []);

  const updateAbout = async ( desc) => {
    let data = {
      description: desc,
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
      await axios.patch("http://localhost:3001/api/about/", data);

      await axios.get("http://localhost:3001/api/about").then((res) => {
        setData(res.data.data[0]);
      });

      Swal.fire(
        "Congratulations!",
        "About us updated successfully!",
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

  const handleOpenEditAboutModal = () => {
    setOpenEditAboutModal(true);
  };
  const handleCloseEditAboutModal = () => {
    setOpenEditAboutModal(false);
  };

  const initialValues = {
    aboutDescription: data.description,
    modalImg: "",
  };

  const aboutInitSchema = Yup.object().shape({
    aboutDescription: Yup.string().required("About description is required"),
    modalImg: Yup.mixed().required("About image is required"),
  });
  return (
    <div id="about">
      {/* {loading ? (
        <Loader />
      ) : data.about_title ? (
        <> */}
      <div className="container">
        <div className="d-flex">
          <div className="col col-xs-12 col-sm-3">
            <Header title="About Us" subtitle="About our services we provide" />
          </div>
          <div className="editDiv d-flex justify-content-end col col-xs-8">
            <button onClick={handleOpenEditAboutModal}>Edit</button>
          </div>
        </div>
        <div className="row">
          <div className="LeftDiv col-xs-12 col-md-6">
            <img
              src={"http://localhost:3001/images/" + data.img}
              className="img-responsive"
              alt=""
            />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <p>{data ? data.description : "loading..."}</p>
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
                updateAbout(values.aboutDescription);
                handleCloseEditAboutModal();
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
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        component="label"
                        size="small"
                        onChange={handleChange("modalImg")}
                        onBlur={handleBlur("modalImg")}
                        color="common"
                      >
                        About image
                        <input
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          hidden
                          name="modalImg"
                          onChange={saveFile}
                        />
                      </Button>
                      <div>
                        {errors.modalImg && touched.modalImg && (
                          <p style={{ color: "red" }}>{errors.modalImg}</p>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                  <div className="service-desc">
                    <div className="linksDiv d-flex justify-content-center">
                      <button className="" type="submit">
                        Update
                      </button>
                      <button onClick={handleCloseEditAboutModal}>close</button>
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

export default About;
