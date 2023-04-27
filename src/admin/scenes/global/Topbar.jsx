import { Badge, Button } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {
  IconButton,
  Typography,
  Box,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Mail, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import YupPassword from "yup-password";
import Swal from "sweetalert2";
YupPassword(Yup);

const Topbar = () => {
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(-1);

  const handleOpenPasswordModal = () => {
    setOpenPasswordModal(true);
  };
  const handleClosePasswordModal = () => {
    setOpenPasswordModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!user) {
      // window.location.href = "/admin/login";
    } else if (user.role !== "admin") {
      // window.location.href = "/admin/login";
    } else {
      setLoading(false);
    }
    // setId(user.id);
  }, []);

  const updatePassword = async (pwd) => {
    const data = {
      email: user.email,
      password: pwd,
      role: user.role,
      profile_picture: "profile.png",
    };
    try {
      setLoading(true);
      await axios.patch(`users/${id}`, data);
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
  return (
    <>
      {/* {loading ? null : (
        <> */}
      <Box display="flex" justifyContent="end" p={2}>
        {/* ICONS */}
        <Box display="flex">
          <div>
              <Typography p={1} variant="h4">Welcome, Mohammed</Typography>
          </div>

          <div className="dropdown">
            <Link
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <IconButton>
                <PersonOutlinedIcon />
              </IconButton>
            </Link>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
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
      {/* </>
      )} */}
    </>
  );
};

export default Topbar;
