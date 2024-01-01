import React from "react";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header";
import { Container, Grid, Paper, TextField, Typography } from "@mui/material";
import Loader from "../../components/Loader";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
// import { updateWebInfoData } from "../../../store/website/webActions";
import Notifications from "../../../components/common/Notifications";

function Website() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.website.webInfo);
  const notification = useSelector((state) => state.ui.notification);

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
      // dispatch(
      //   updateWebInfoData({
      //     id: data.id,
      //     name,
      //     email,
      //     mobile,
      //     address,
      //     facebook,
      //     twitter,
      //     instagram,
      //     youtube,
      //     footer_description: description,
      //     books,
      //   })
      // );
      Swal.fire("Congratulations!", "Website updated successfully!", "success");

      setLoading(false);
    } catch (error) {
      Swal.fire("Sorry!", "Something went wrong!", "error");
      setLoading(false);
    }
  };

  const initialValues = {
    webName: data.name,
    webEmail: data.email,
    webMobile: data.mobile,
    webAddress: data.address,
    webFacebookUrl: data.facebook,
    webTwitterUrl: data.twitter,
    webInstagramUrl: data.instagram,
    webYoutubeUrl: data.youtube,
    webDescription: data.footer_description,
    webBooks: data.books,
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
      ) : data ? (
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
                          <p style={{ color: "red" }}>
                            {errors.webInstagramUrl}
                          </p>
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
                          <p style={{ color: "red" }}>
                            {errors.webDescription}
                          </p>
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
      ) : notification ? (
        <Notifications
          type={notification.type}
          message={notification.message}
        />
      ) : (
        "Something went wrong, please try again later!"
      )}
    </div>
  );
}

export default Website;
