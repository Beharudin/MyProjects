import React from "react";
import "./services.css";
import { Link } from "react-router-dom";
import { Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Header from "../../components/Header";

function Services(props) {
  const [openEditServiceModal, setOpenEditServiceModal] = useState(false);
  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [openAddServiceModal, setOpenAddServiceModal] = useState(false);
  const [modalImg, setModalImg] = useState();
  const [modalName, setModalName] = useState("");
  const [modalDesc, setModalDesc] = useState("");

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

  const handleOpenServiceModal = (img, name, desc) => {
    setModalImg(img);
    setModalName(name);
    setModalDesc(desc);
    setOpenServiceModal(true);
  };
  const handleCloseServiceModal = () => {
    setOpenServiceModal(false);
  };

  const handleOpenEditServiceModal = () => {
    setOpenServiceModal(false);
    setOpenEditServiceModal(true);
  };
  const handleCloseEditServiceModal = () => {
    setOpenEditServiceModal(false);
  };
  
  const handleOpenAddServiceModal = () => {
    setOpenAddServiceModal(true);
  };
  const handleCloseAddServiceModal = () => {
    setOpenAddServiceModal(false);
  };

  const addInitialValues = {
    loanType: "",
    loanDescription: "",
    loanImg: "",
  };
  const editInitialValues = {
    loanType: modalName,
    loanDescription: modalDesc,
    loanImg: modalImg,
  };

  const serviceInitSchema = Yup.object().shape({
    loanType: Yup.string().required("Loan type is required"),
    loanDescription: Yup.string().required("Loan description is required"),
    loanImg: Yup.mixed().required("Loan image is required"),
  });

  return (
    <div className="container">
      <Box sx={{ display: "flex" }}>
        <div className="col col-xs-12 col-sm-3">
          <Header title="Services" subtitle="Services we provide for our customers" />
        </div>
        <div className="d-flex justify-content-end col col-xs-12 col-sm-8">
          <Link className="Link">
            <button className="apply-btn" onClick={handleOpenAddServiceModal}>
              Add New
            </button>
          </Link>
        </div>
      </Box>
      <div className=" text-center">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((data, index) => (
                <>
                  <div key={`${data.name}-${index}`} className="col-md-4">
                    <i>
                      <img src={data.img} alt="" className="service-img" />
                    </i>
                    <div className="service-desc">
                      <h3>{data.name}</h3>
                      <p className="service-text">{data.text}</p>
                      <Link className="Link">
                        <button
                          className="apply-btn"
                          onClick={() =>
                            handleOpenServiceModal(
                              data.img,
                              data.name,
                              data.text
                            )
                          }
                        >
                          View more
                        </button>
                      </Link>
                    </div>
                  </div>
                </>
              ))
            : "loading"}
        </div>
        <Modal
          open={openServiceModal}
          onClose={handleCloseServiceModal}
        >
          <Box sx={style}>
            <div className="d-flex justify-content-center">
              <img src={modalImg} alt="" className="service-img" />
            </div>
            <div className="service-desc">
              <div className="text-center">
                <h3>{modalName}</h3>
              </div>
              <p className="service-text">{modalDesc}</p>
              <div className="linksDiv d-flex justify-content-center">
                <Link className="Link">
                  <button
                    className="apply-btn"
                    onClick={handleOpenEditServiceModal}
                  >
                    Edit
                  </button>
                </Link>
                <Link className="Link">
                  <button className="apply-btn">Delete</button>
                </Link>
                <Link className="Link">
                  <button className="apply-btn" onClick={handleCloseServiceModal}>
                    close
                  </button>
                </Link>
              </div>
            </div>
          </Box>
        </Modal>
        <Modal open={openEditServiceModal} onClose={handleCloseEditServiceModal}>
          <Box sx={style}>
            <Formik
              enableReinitialize
              initialValues={editInitialValues}
              validationSchema={serviceInitSchema}
              validateOnMount={true}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Typography variant="h6" gutterBottom>
                    Service information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="loanType"
                        name="loanType"
                        label="Loan Type"
                        fullWidth
                        variant="standard"
                        value={values.loanType}
                        onChange={handleChange("loanType")}
                        onBlur={handleBlur("loanType")}
                        sx={{ p: 2 }}
                      />
                      {touched.loanType && errors.loanType && (
                        <p style={{ color: "red" }}>{errors.loanType}</p>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="loanDescription"
                        name="loanDescription"
                        label="Loan Description"
                        value={values.loanDescription}
                        multiline
                        maxRows={10}
                        fullWidth
                        variant="standard"
                        onChange={handleChange("loanDescription")}
                        onBlur={handleBlur("loanDescription")}
                        sx={{ p: 2 }}
                      />
                      {touched.loanDescription && errors.loanDescription && (
                        <p style={{ color: "red" }}>{errors.loanDescription}</p>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        component="label"
                        size="small"
                        onChange={handleChange("loanImg")}
                        onBlur={handleBlur("loanImg")}
                        color="common"
                      >
                        Loan image
                        <input type="file" hidden name="loanImg" />
                      </Button>
                      <div>
                        {errors.loanImg && touched.loanImg && (
                          <p style={{ color: "red" }}>{errors.loanImg}</p>
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
                    onClick={handleCloseEditServiceModal}
                  >
                    close
                  </button>
                </Link>
              </div>
            </div>
          </Box>
        </Modal>
        <Modal open={openAddServiceModal} onClose={handleCloseAddServiceModal}>
          <Box sx={style}>
            <Formik
              enableReinitialize
              initialValues={addInitialValues}
              validationSchema={serviceInitSchema}
              validateOnMount={true}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Typography variant="h6" gutterBottom>
                    Service information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="loanType"
                        name="loanType"
                        label="Loan Type"
                        fullWidth
                        variant="standard"
                        value={values.loanType}
                        onChange={handleChange("loanType")}
                        onBlur={handleBlur("loanType")}
                        sx={{ p: 2 }}
                      />
                      {touched.loanType && errors.loanType && (
                        <p style={{ color: "red" }}>{errors.loanType}</p>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="loanDescription"
                        name="loanDescription"
                        label="Loan Description"
                        value={values.loanDescription}
                        multiline
                        maxRows={10}
                        fullWidth
                        variant="standard"
                        onChange={handleChange("loanDescription")}
                        onBlur={handleBlur("loanDescription")}
                        sx={{ p: 2 }}
                      />
                      {touched.loanDescription && errors.loanDescription && (
                        <p style={{ color: "red" }}>{errors.loanDescription}</p>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        component="label"
                        size="small"
                        onChange={handleChange("loanImg")}
                        onBlur={handleBlur("loanImg")}
                        color="common"
                      >
                        Loan image
                        <input type="file" hidden name="loanImg" />
                      </Button>
                      <div>
                        {errors.loanImg && touched.loanImg && (
                          <p style={{ color: "red" }}>{errors.loanImg}</p>
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
                    onClick={handleCloseAddServiceModal}
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
export default Services;
