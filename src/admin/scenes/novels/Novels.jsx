import React from "react";
import "./novels.css";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  InputLabel,
  Modal,
  Select,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  IconButton, Box
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import axios from "axios";
import { Close } from "@mui/icons-material";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

function Novels() {
  const [services, setServices] = useState([]);
  const [openEditServiceModal, setOpenEditServiceModal] = useState(false);
  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [openAddServiceModal, setOpenAddServiceModal] = useState(false);
  const [modalImg, setModalImg] = useState();
  const [modalName, setModalName] = useState("");
  const [modalDesc, setModalDesc] = useState("");
  const [modalCategory, setModalCategory] = useState("");
  const [modalStatus, setModalStatus] = useState("active");
  const [modalId, setModalId] = useState();
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  // if(!user){
  //   setLoading(true);
  //   window.location.href='/admin/login'
  // }
  // else if(user.role !== 'admin'){
  //   setLoading(true);
  //   window.location.href='/admin/login'
  // }
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        await axios.get("/services/").then((res) => {
          setServices(res.data.data);
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const addService = async (name, img, desc, category, status) => {
    try {
      setLoading(true);
      await axios.post("/services/", {
        name: name,
        image: img,
        description: desc,
        category: category,
        status: status,
      });
      setError(false);
      setSuccess(true);
      setMsg("Service added successfully!");
      await axios.get("/services/").then((res) => {
        setServices(res.data.data);
      });
      setLoading(false);
    } catch (error) {
      setSuccess(false);
      setError(true);
      setMsg("Something went wrong!");
      setLoading(false);
    }
  };

  const updateService = async (id, name, img, desc, category, status) => {
    try {
      setLoading(true);
      await axios.patch(`/services/${id}`, {
        name: name,
        image: "urllllll",
        description: desc,
        category: category,
        status: status,
      });
      Swal.fire("Congratulations!", "Service updated successfully!", "success");
      await axios.get("/services/").then((res) => {
        setServices(res.data.data);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      Swal.fire("Sorry!", "Something went wrong!", "error");
      setLoading(false);
    }
  };
  const deleteService = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/services/${id}`);

      Swal.fire("Congratulations!", "Service deleted successfully!", "success");
      await axios.get("/services/").then((res) => {
        setServices(res.data.data);
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

  const handleOpenServiceModal = (id, img, name, desc, category, status) => {
    setModalImg(img);
    setModalName(name);
    setModalDesc(desc);
    setModalCategory(category);
    setModalStatus(status);
    setModalId(id);
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
    loanCategory: "",
    loanStatus: modalStatus,
  };
  const editInitialValues = {
    loanType: modalName,
    loanDescription: modalDesc,
    loanImg: modalImg,
    loanCategory: modalCategory,
    loanStatus: modalStatus,
  };

  const serviceInitSchema = Yup.object().shape({
    loanType: Yup.string().required("Service type is required"),
    loanDescription: Yup.string().required("Service description is required"),
    loanCategory: Yup.string().required("Service type is required"),
    loanImg: Yup.mixed().required("Service image is required"),
  });

  return (
    <div className="container">
      {/* {loading ? (
        <Loader />
      ) : services.length ? (
        <> */}
      <Box sx={{ display: "flex" }}>
        <div className="col col-xs-12 col-sm-3">
          <Header
            title="Novels"
            subtitle="Novels we provide for our customers"
          />
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
        <div className="row">
          {services
            ? services.map((service, index) => (
                <>
                  <div
                    key={`${service.service_name}-${index}`}
                    className="col-md-4"
                  >
                    <i>
                      <img
                        src={service.service_image}
                        alt=""
                        className="service-img"
                      />
                    </i>
                    <div className="service-desc">
                      <h3>{service.service_name}</h3>
                      <p className="service-text">{service.service_desc}</p>
                      <Link className="Link">
                        <button
                          className="apply-btn"
                          onClick={() =>
                            handleOpenServiceModal(
                              service.id,
                              service.service_image,
                              service.service_name,
                              service.service_desc,
                              service.service_category,
                              service.service_status
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
        <Modal open={openServiceModal} onClose={handleCloseServiceModal}>
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
                <button
                  className="apply-btn"
                  onClick={handleOpenEditServiceModal}
                >
                  Edit
                </button>
                <button
                  className="apply-btn"
                  onClick={() => {
                    handleCloseServiceModal();
                    deleteService(modalId);
                  }}
                >
                  Delete
                </button>
                <button className="apply-btn" onClick={handleCloseServiceModal}>
                  close
                </button>
              </div>
            </div>
          </Box>
        </Modal>
        <Modal
          open={openEditServiceModal}
          onClose={handleCloseEditServiceModal}
        >
          <Box sx={style}>
            <Formik
              enableReinitialize
              initialValues={editInitialValues}
              validationSchema={serviceInitSchema}
              validateOnMount={true}
              onSubmit={(values) => {
                updateService(
                  modalId,
                  values.loanType,
                  values.loanImg,
                  values.loanDescription,
                  values.loanCategory,
                  values.loanStatus
                );
                setOpenEditServiceModal(false);
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
                      <TextField
                        required
                        id="loanCategory"
                        name="loanCategory"
                        label="Loan Category"
                        fullWidth
                        variant="standard"
                        value={values.loanCategory}
                        onChange={handleChange("loanCategory")}
                        onBlur={handleBlur("loanCategory")}
                        sx={{ p: 2 }}
                      />
                      {touched.loanCategory && errors.loanCategory && (
                        <p style={{ color: "red" }}>{errors.loanCategory}</p>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="status">Status</InputLabel>
                        <Select
                          labelId="status"
                          id="statusSelect"
                          value={modalStatus}
                          onChange={(event) =>
                            setModalStatus(event.target.value)
                          }
                        >
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="passive">Passive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        component="label"
                        size="small"
                        onChange={handleChange("serviceImg")}
                        onBlur={handleBlur("serviceImg")}
                        color="common"
                      >
                        Loan image
                        <input
                          type="file"
                          hidden
                          name="serviceImg"
                          accept="image/png, image/gif, image/jpeg"
                        />
                      </Button>
                      <div>
                        {errors.serviceImg && touched.serviceImg && (
                          <p style={{ color: "red" }}>{errors.serviceImg}</p>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                  <div className="service-desc">
                    <div className="linksDiv d-flex justify-content-center">
                      <button className="apply-btn" type="submit">
                        Update
                      </button>
                      <button
                        className="apply-btn"
                        onClick={handleCloseEditServiceModal}
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
        <Modal open={openAddServiceModal} onClose={handleCloseAddServiceModal}>
          <Box sx={style}>
            {error && (
                <div
                  className="alert alert-danger d-flex justify-content-between"
                  role="alert"
                >
                  {msg}
                  <IconButton onClick={() => setError(false)} sx={{p:0}}>
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
                  <IconButton onClick={() => setSuccess(false)} sx={{p:0}}>
                    {<Close />}
                  </IconButton>
                </div>
            )}
            <Formik
              enableReinitialize
              initialValues={addInitialValues}
              validationSchema={serviceInitSchema}
              validateOnMount={true}
              onSubmit={(values, actions) => {
                addService(
                  values.loanType,
                  values.loanImg,
                  values.loanDescription,
                  values.loanCategory,
                  values.loanStatus
                );
                actions.resetForm();
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
                      <TextField
                        required
                        id="loanCategory"
                        name="loanCategory"
                        label="Loan Category"
                        fullWidth
                        variant="standard"
                        value={values.loanCategory}
                        onChange={handleChange("loanCategory")}
                        onBlur={handleBlur("loanCategory")}
                        sx={{ p: 2 }}
                      />
                      {touched.loanCategory && errors.loanCategory && (
                        <p style={{ color: "red" }}>{errors.loanCategory}</p>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="status">Status</InputLabel>
                        <Select
                          labelId="status"
                          id="loanStatus"
                          name="loanStatus"
                          value={values.loanStatus}
                          onChange={handleChange("loanStatus")}
                        >
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="passive">Passive</MenuItem>
                        </Select>
                      </FormControl>
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
                        <input
                          type="file"
                          hidden
                          accept="image/png, image/gif, image/jpeg"
                          name="loanImg"
                        />
                      </Button>
                      <div>
                        {errors.loanImg && touched.loanImg && (
                          <p style={{ color: "red" }}>{errors.loanImg}</p>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                  <div className="service-desc">
                    <div className="linksDiv d-flex justify-content-center">
                      <button className="apply-btn" type="submit">
                        Save
                      </button>
                      <button
                        className="apply-btn"
                        onClick={handleCloseAddServiceModal}
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
export default Novels;
