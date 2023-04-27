import React from "react";
import { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import Swal from "sweetalert2";

function Website() {
  const [webName, setWebName] = useState("");
  const [webEmail, setWebEmail] = useState("");
  const [webMobile, setWebMobile] = useState("");
  const [webAddress, setWebaddress] = useState("");
  const [webFacebookUrl, setWebfacebookUrl] = useState("");
  const [webTwitterUrl, setWebTwitterUrl] = useState("");
  const [webYoutubeUrl, setWebYoutubeUrl] = useState("");
  const [webInstagramUrl, setWebInstagrameUrl] = useState("");
  const [webDescription, setWebDescription] = useState("");
  const [webBooks, setWebBooks] = useState("");
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
    const getWebsiteInfo = async () => {
      try {
        setLoading(true);
        await axios.get("/website/").then((res) => {
          setWebName(res.data.data[0].name);
          setWebEmail(res.data.data[0].email);
          setWebMobile(res.data.data[0].mobile);
          setWebaddress(res.data.data[0].address);
          setWebfacebookUrl(res.data.data[0].facebook);
          setWebTwitterUrl(res.data.data[0].twitter);
          setWebInstagrameUrl(res.data.data[0].twitter);
          setWebYoutubeUrl(res.data.data[0].youtube);
          setWebDescription(res.data.data[0].footer_description);
          setWebBooks(res.data.data[0].books);
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getWebsiteInfo();
  }, []);

  const updateWebsiteInfo = async (
    name,
    email,
    mobile,
    address,
    facebook,
    twitter,
    instagram,
    youtube,
    description,
    books
  ) => {
    try {
      setLoading(true);
      await axios.patch("/website/", {
        name: name,
        email: email,
        mobile: mobile,
        address: address,
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
        youtube: youtube,
        footer_description: description,
        books: books
      });
      Swal.fire(
        "Congratulations!",
        "Website updated successfully!",
        "success"
      );
      await axios.get("/website/").then((res) => {
        setWebName(res.data.data[0].name);
          setWebEmail(res.data.data[0].email);
          setWebMobile(res.data.data[0].mobile);
          setWebaddress(res.data.data[0].address);
          setWebfacebookUrl(res.data.data[0].facebook);
          setWebTwitterUrl(res.data.data[0].twitter);
          setWebInstagrameUrl(res.data.data[0].twitter);
          setWebYoutubeUrl(res.data.data[0].youtube);
          setWebDescription(res.data.data[0].footer_description);
          setWebBooks(res.data.data[0].books);
      });
      setLoading(false);
    } catch (error) {
      Swal.fire("Sorry!", "Something went wrong!", "error");
      setLoading(false);
    }
  };

  const initialValues = {
    webName: webName,
    webEmail: webEmail,
    webMobile: webMobile,
    webAddress: webAddress,
    webFacebookUrl: webFacebookUrl,
    webTwitterUrl: webTwitterUrl,
    webInstagramUrl: webInstagramUrl,
    webYoutubeUrl: webYoutubeUrl,
    webDescription: webDescription,
    webBooks: webBooks,
  };

  const initSchema = Yup.object().shape({
    webName: Yup.string().required("Website name is required"),
    webEmail: Yup.string().required("Website email is required"),
    webMobile: Yup.string().required("Website mobile is required"),
    webAddress: Yup.string().required("Website address is required"),
    webFacebookUrl: Yup.string().required("Website facebook URL is required"),
    webTwitterUrl: Yup.string().required("Website twitter URL is required"),
    webInstagramUrl: Yup.string().required("Website instagram URL is required"),
    webYoutubeUrl: Yup.string().required("Website youtube URL is required"),
    webDescription: Yup.string().required("Website description is required"),
    webBooks: Yup.string().required("Books are required"),
  });
  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : webName ? (
        <>
          <div className="d-flex">
            <div className="col col-xs-12 col-sm-3">
              <Header title="Website" subtitle="Our website information" />
            </div>
          </div>
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={initSchema}
                validateOnMount={true}
                onSubmit={(values) => {
                  updateWebsiteInfo(
                    values.webName,
                    values.webEmail,
                    values.webMobile,
                    values.webAddress,
                    values.webFacebookUrl,
                    values.webTwitterUrl,
                    values.webInstagramUrl,
                    values.webYoutubeUrl,
                    values.webDescription,
                    values.webBooks
                  );
                }}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form>
                    <Typography variant="h6" gutterBottom>
                      Website information
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="webName"
                          name="webName"
                          label="Name"
                          value={values.webName}
                          multiline
                          maxRows={10}
                          fullWidth
                          variant="standard"
                          onChange={handleChange("webName")}
                          onBlur={handleBlur("webName")}
                          sx={{ p: 2 }}
                        />
                        {touched.webName && errors.webName && (
                          <p style={{ color: "red" }}>{errors.webName}</p>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="webEmail"
                          name="webEmail"
                          label="Email"
                          value={values.webEmail}
                          multiline
                          maxRows={10}
                          fullWidth
                          variant="standard"
                          onChange={handleChange("webEmail")}
                          onBlur={handleBlur("webEmail")}
                          sx={{ p: 2 }}
                        />
                        {touched.webEmail && errors.webEmail && (
                          <p style={{ color: "red" }}>{errors.webEmail}</p>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="webMobile"
                          name="webMobile"
                          label="Mobile"
                          value={values.webMobile}
                          multiline
                          maxRows={10}
                          fullWidth
                          variant="standard"
                          onChange={handleChange("webMobile")}
                          onBlur={handleBlur("webMobile")}
                          sx={{ p: 2 }}
                        />
                        {touched.webMobile && errors.webMobile && (
                          <p style={{ color: "red" }}>{errors.webMobile}</p>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="webAddress"
                          name="webAddress"
                          label="Address"
                          value={values.webAddress}
                          multiline
                          maxRows={10}
                          fullWidth
                          variant="standard"
                          onChange={handleChange("webAddress")}
                          onBlur={handleBlur("webAddress")}
                          sx={{ p: 2 }}
                        />
                        {touched.webAddress && errors.webAddress && (
                          <p style={{ color: "red" }}>{errors.webAddress}</p>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="webFacebookUrl"
                          name="webFacebookUrl"
                          label="Facebook"
                          value={values.webFacebookUrl}
                          multiline
                          maxRows={10}
                          fullWidth
                          variant="standard"
                          onChange={handleChange("webFacebookUrl")}
                          onBlur={handleBlur("webFacebookUrl")}
                          sx={{ p: 2 }}
                        />
                        {touched.webFacebookUrl && errors.webFacebookUrl && (
                          <p style={{ color: "red" }}>
                            {errors.webFacebookUrl}
                          </p>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="webTwitterUrl"
                          name="webTwitterUrl"
                          label="Twitter"
                          value={values.webTwitterUrl}
                          multiline
                          maxRows={10}
                          fullWidth
                          variant="standard"
                          onChange={handleChange("webTwitterUrl")}
                          onBlur={handleBlur("webTwitterUrl")}
                          sx={{ p: 2 }}
                        />
                        {touched.webTwitterUrl && errors.webTwitterUrl && (
                          <p style={{ color: "red" }}>{errors.webTwitterUrl}</p>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="webYoutubeUrl"
                          name="webYoutubeUrl"
                          label="Youtube"
                          value={values.webYoutubeUrl}
                          multiline
                          maxRows={10}
                          fullWidth
                          variant="standard"
                          onChange={handleChange("webYoutubeUrl")}
                          onBlur={handleBlur("webYoutubeUrl")}
                          sx={{ p: 2 }}
                        />
                        {touched.webYoutubeUrl && errors.webYoutubeUrl && (
                          <p style={{ color: "red" }}>{errors.webYoutubeUrl}</p>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="webInstagramUrl"
                          name="webInstagramUrl"
                          label="Instagram"
                          fullWidth
                          multiline
                          maxRows={5}
                          variant="standard"
                          value={values.webInstagramUrl}
                          onChange={handleChange("webInstagramUrl")}
                          onBlur={handleBlur("webInstagramUrl")}
                          sx={{ p: 2 }}
                        />
                        {touched.webInstagramUrl && errors.webInstagramUrl && (
                          <p style={{ color: "red" }}>{errors.webInstagramUrl}</p>
                        )}
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          required
                          id="webBooks"
                          name="webBooks"
                          label="Books"
                          fullWidth
                          multiline
                          maxRows={5}
                          variant="standard"
                          value={values.webBooks}
                          onChange={handleChange("webBooks")}
                          onBlur={handleBlur("webBooks")}
                          sx={{ p: 2 }}
                        />
                        {touched.webBooks && errors.webBooks && (
                          <p style={{ color: "red" }}>{errors.webBooks}</p>
                        )}
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          required
                          id="webDescription"
                          name="webDescription"
                          label="Description"
                          fullWidth
                          multiline
                          maxRows={5}
                          variant="standard"
                          value={values.webDescription}
                          onChange={handleChange("webDescription")}
                          onBlur={handleBlur("webDescription")}
                          sx={{ p: 2 }}
                        />
                        {touched.webDescription && errors.webDescription && (
                          <p style={{ color: "red" }}>{errors.webDescription}</p>
                        )}
                      </Grid>
                    </Grid>
                    <div className="service-desc">
                      <div className="linksDiv d-flex justify-content-center">
                        <button className="apply-btn">Save</button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Container>
        </>
      ) : (
        <Error message="Something went wrong, please try again later!" />
      )}
    </div>
  );
}

export default Website;
