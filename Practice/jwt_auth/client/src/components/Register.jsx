import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/loginActions";
import { useNavigate } from "react-router-dom";


function Register() {
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(false);
  //   const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const initialValues = {
    username: "",
    userEmail: "",
    userPwd: "",
  };
  
  const aboutInitSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    userEmail: Yup.string().required("Email is required"),
    userPwd: Yup.string().required("Password is required"),
  });
  
  const redirectPath = "/login";
  const registerHandler = async (username, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/register",
        { username, email, password }
      );

      // Redirect or update the UI as needed
      navigate(redirectPath, { replace: true });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ height: "100%" }}>
      {/* {loading ? (
        <Loader />
      ) : ( */}
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-12 col-xl-11">
            <div
              className="card text-black m-5"
              style={{ borderRadius: "25px" }}
            >
              {/* {error && <Error message={msg} />} */}
              <div className="card-body">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h3 fw-bold mb-4 mx-1 mx-md-4 mt-4">
                      Register
                    </p>

                    <Formik
                      enableReinitialize
                      initialValues={initialValues}
                      validationSchema={aboutInitSchema}
                      validateOnMount={true}
                      onSubmit={(values) => {
                        registerHandler(
                          values.username,
                          values.userEmail,
                          values.userPwd
                        );
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                      }) => (
                        <Form>
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <div className="d-flex flex-row align-items-center">
                                <FontAwesomeIcon
                                  icon={faUser}
                                  className="fa-lg me-3 fa-fw"
                                />
                                <TextField
                                  required
                                  id="username"
                                  name="username"
                                  label="Username"
                                  value={values.username}
                                  multiline
                                  maxRows={10}
                                  fullWidth
                                  variant="standard"
                                  onChange={handleChange("username")}
                                  onBlur={handleBlur("username")}
                                  sx={{ p: 2 }}
                                />
                              </div>
                              {touched.username && errors.username && (
                                <p style={{ color: "red", marginLeft: "40px" }}>
                                  {errors.username}
                                </p>
                              )}
                            </Grid>
                            <Grid item xs={12}>
                              <div className="d-flex flex-row align-items-center">
                                <FontAwesomeIcon
                                  icon={faEnvelope}
                                  className="fa-lg me-3 fa-fw"
                                />
                                <TextField
                                  required
                                  id="userEmail"
                                  name="userEmail"
                                  label="Email"
                                  value={values.userEmail}
                                  multiline
                                  maxRows={10}
                                  fullWidth
                                  variant="standard"
                                  onChange={handleChange("userEmail")}
                                  onBlur={handleBlur("userEmail")}
                                  sx={{ p: 2 }}
                                />
                              </div>
                              {touched.userEmail && errors.userEmail && (
                                <p style={{ color: "red", marginLeft: "40px" }}>
                                  {errors.userEmail}
                                </p>
                              )}
                            </Grid>
                            <Grid item xs={12}>
                              <div className="d-flex flex-row align-items-center">
                                <FontAwesomeIcon
                                  icon={faLock}
                                  className="fa-lg me-3 fa-fw"
                                />
                                <TextField
                                  required
                                  id="userPwd"
                                  name="userPwd"
                                  label="password"
                                  value={values.userPwd}
                                  multiline
                                  maxRows={10}
                                  fullWidth
                                  variant="standard"
                                  onChange={handleChange("userPwd")}
                                  onBlur={handleBlur("userPwd")}
                                  sx={{ p: 2 }}
                                />
                              </div>
                              {touched.userPwd && errors.userPwd && (
                                <p style={{ color: "red", marginLeft: "40px" }}>
                                  {errors.userPwd}
                                </p>
                              )}
                            </Grid>
                          </Grid>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                            >
                              Register
                            </button>
                          </div>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <p>
                              Do you have an account?{" "}
                              <a href="/login">Login</a>
                            </p>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* )}  */}
    </div>
  );
}

export default Register;
