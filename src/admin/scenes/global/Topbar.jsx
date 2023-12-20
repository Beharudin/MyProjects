import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {
  Box, Button, Grid, IconButton, Modal,
  TextField, Typography
} from "@mui/material";
import axios from "axios";
import { Form, Formik } from "formik";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { cookies } from "../../..";
import {
  updateUserData,
  updateUserPassword,
} from "../../../store/auth/authActions";
import { logout } from "../../../store/auth/authSlice";
YupPassword(Yup);

const Topbar = () => {
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const token = cookies.get("token");
  let user = jwtDecode(token);

  useEffect(() => {
    user = jwtDecode(cookies.get("token"));
  }, [accessToken]);

  const handleOpenPasswordModal = () => {
    setOpenPasswordModal(true);
  };

  const handleClosePasswordModal = () => {
    setOpenPasswordModal(false);
  };

  const handleOpenProfileModal = () => {
    setOpenProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setOpenProfileModal(false);
  };

  const handleLogout = () => {
    cookies.remove("token");
    dispatch(logout());
  };
  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const updateProfile = async (email, fullname, profile_img) => {
    const data = {
      userId: user.userId,
      email,
      fullname,
    };
    if (file) {
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append("name", filename);
      formData.append("file", file);
      data.profile_img = filename;

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
      dispatch(updateUserData(data));
      setOpenProfileModal(false);
      Swal.fire(
        "Congratulations!",
        "Password updated successfully!",
        "success"
      );
      setLoading(false);
    } catch (error) {
      Swal.fire("Sorry!", "Something went wrong!", "error");
    }
  };

  const updatePassword = async (pwd) => {
    const data = {
      userId: user.userId,
      password: pwd,
    };
    try {
      setLoading(true);
      dispatch(updateUserPassword(data));
      setOpenPasswordModal(false);
      Swal.fire(
        "Congratulations!",
        "Password updated successfully!",
        "success"
      );
      setLoading(false);
    } catch (error) {
      Swal.fire("Sorry!", "Something went wrong!", "error");
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

  const editInitialValues = {
    password: "",
    password1: "",
  };
  const profileInitialValues = {
    fullname: user.fullname,
    email: user.email,
    profile_img: "",
  };

  const initSchema = Yup.object().shape({
    password: Yup.string()
      .required("No password provided.")
      .min(
        8,
        "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
      )
      .minLowercase(1, "password must contain at least 1 lower case letter")
      .minUppercase(1, "password must contain at least 1 upper case letter")
      .minNumbers(1, "password must contain at least 1 number")
      .minSymbols(1, "password must contain at least 1 special character"),
    password1: Yup.string("Required").oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const profileSchema = Yup.object().shape({
    fullname: Yup.string().required("No name provided."),
    email: Yup.string().email("Invalid email address").required("Required"),
    profile_img: Yup.string().required("No image provided."),
  });
  return (
    <>
      {loading ? null : (
        <>
          <Box display="flex" justifyContent="end" p={2}>
            {/* ICONS */}
            <Box display="flex">
              <div>
                <Typography p={1} variant="h4">
                  Welcome, {user.fullname.split(" ")[0]}
                </Typography>
              </div>
              <div className="dropdown">
                <Link
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <IconButton>
                    <PersonOutlinedIcon />
                  </IconButton>
                </Link>

                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={handleOpenProfileModal}
                    >
                      Change profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={handleOpenPasswordModal}
                    >
                      Change password
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </Box>
          </Box>

          <Modal open={openPasswordModal} onClose={handleClosePasswordModal}>
            <Box sx={style}>
              <Formik
                enableReinitialize
                initialValues={editInitialValues}
                validationSchema={initSchema}
                validateOnMount={true}
                onSubmit={(values) => {
                  updatePassword(values.password);
                  handleClosePasswordModal();
                }}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form>
                    <Typography variant="h6" gutterBottom>
                      Change password
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="password"
                          name="password"
                          label="New password"
                          fullWidth
                          multiline
                          maxRows={5}
                          variant="standard"
                          value={values.password}
                          onChange={handleChange("password")}
                          onBlur={handleBlur("password")}
                          sx={{ p: 2 }}
                        />
                        {touched.password && errors.password && (
                          <p style={{ color: "red" }}>{errors.password}</p>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="password1"
                          name="password1"
                          label="Retype new password"
                          fullWidth
                          multiline
                          maxRows={5}
                          variant="standard"
                          value={values.password1}
                          onChange={handleChange("password1")}
                          onBlur={handleBlur("password1")}
                          sx={{ p: 2 }}
                        />
                        {touched.password1 && errors.password1 && (
                          <p style={{ color: "red" }}>{errors.password1}</p>
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
                          onClick={handleClosePasswordModal}
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

          {/* profile modal */}
          <Modal open={openProfileModal} onClose={handleCloseProfileModal}>
            <Box sx={style}>
              <Formik
                enableReinitialize
                initialValues={profileInitialValues}
                validationSchema={profileSchema}
                validateOnMount={true}
                onSubmit={(values) => {
                  updateProfile(
                    values.email,
                    values.fullname,
                    values.profile_img
                  );
                  handleClosePasswordModal();
                }}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form>
                    <Typography variant="h6" gutterBottom>
                      Change Profile
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="fullname"
                          name="fullname"
                          label="Fullname"
                          fullWidth
                          multiline
                          maxRows={5}
                          variant="standard"
                          value={values.fullname}
                          onChange={handleChange("fullname")}
                          onBlur={handleBlur("fullname")}
                          sx={{ p: 2 }}
                        />
                        {touched.fullname && errors.fullname && (
                          <p style={{ color: "red" }}>{errors.fullname}</p>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="email"
                          name="email"
                          label="Email"
                          fullWidth
                          multiline
                          maxRows={5}
                          variant="standard"
                          value={values.email}
                          onChange={handleChange("email")}
                          onBlur={handleBlur("email")}
                          sx={{ p: 2 }}
                        />
                        {touched.email && errors.email && (
                          <p style={{ color: "red" }}>{errors.email}</p>
                        )}
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Button
                          variant="contained"
                          component="label"
                          size="small"
                          onChange={handleChange("profile_img")}
                          onBlur={handleBlur("profile_img")}
                          color="common"
                        >
                          Profile image
                          <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            hidden
                            name="profile_img"
                            onChange={saveFile}
                          />
                        </Button>
                        <div>
                          {errors.profile_img && touched.profile_img && (
                            <p style={{ color: "red" }}>{errors.profile_img}</p>
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
                          onClick={handleCloseProfileModal}
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
      )}
    </>
  );
};

export default Topbar;
