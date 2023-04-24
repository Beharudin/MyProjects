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

function Website() {
  const [webName, setWebName] = useState("");
  const [webEmail, setWebEmail] = useState("");
  const [webMobile, setWebMobile] = useState("");
  const [webAddress, setWebaddress] = useState("");
  const [webFacebookUrl, setWebfacebookUrl] = useState("");
  const [webTwitterUrl, setWebTwitterUrl] = useState("");
  const [webYoutubeUrl, setWebYoutubeUrl] = useState("");
  const [webHeroText, setWebHeroText] = useState("");
  const [webLogo, setWebLogo] = useState("");
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
        await axios.get("/settings/").then((res) => {
          setWebName(res.data.data[0].site_name);
          setWebEmail(res.data.data[0].site_email);
          setWebMobile(res.data.data[0].site_mobile);
          setWebaddress(res.data.data[0].site_address);
          setWebfacebookUrl(res.data.data[0].site_facebook_url);
          setWebTwitterUrl(res.data.data[0].site_twitter_url);
          setWebYoutubeUrl(res.data.data[0].site_youtube_url);
          setWebHeroText(res.data.data[0].site_hero_text);
          setWebLogo(res.data.data[0].site_logo);
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
    youtube,
    herotext,
    img
  ) => {
    try {
      setLoading(true);
      await axios.patch("/settings/", {
        name: name,
        email: email,
        mobile: mobile,
        address: address,
        facebookURL: facebook,
        twitterURL: twitter,
        youtubeURL: youtube,
        heroText: herotext,
        logo: img ? img : webLogo,
      });
      await axios.get("/settings/").then((res) => {
        setWebName(res.data.data[0].site_name);
        setWebEmail(res.data.data[0].site_email);
        setWebMobile(res.data.data[0].site_mobile);
        setWebaddress(res.data.data[0].site_address);
        setWebfacebookUrl(res.data.data[0].site_facebook_url);
        setWebTwitterUrl(res.data.data[0].site_twitter_url);
        setWebYoutubeUrl(res.data.data[0].site_youtube_url);
        setWebHeroText(res.data.data[0].site_hero_text);
        setWebLogo(res.data.data[0].site_logo);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
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
    webYoutubeUrl: webYoutubeUrl,
    webHeroText: webHeroText,
    webLogo: webLogo,
    books: [],
  };

  const initSchema = Yup.object().shape({
    webName: Yup.string().required("Website name is required"),
    webEmail: Yup.string().required("Website email is required"),
    webMobile: Yup.string().required("Website mobile is required"),
    webAddress: Yup.string().required("Website address is required"),
    webFacebookUrl: Yup.string().required("Website facebook URL is required"),
    webTwitterUrl: Yup.string().required("Website twitter URL is required"),
    webYoutubeUrl: Yup.string().required("Website youtube URL is required"),
    webHeroText: Yup.string().required("Website hero text is required"),
    webLogo: Yup.mixed().required("Website image is required"),
    books: Yup.string().required("Books are required"),
  });
  return (
    <div className="container">
      {/* {loading ? (
        <Loader />
      ) : webName ? (
        <> */}
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
                    values.webYoutubeUrl,
                    values.webHeroText,
                    values.webLogo
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
                          id="webHeroText"
                          name="webHeroText"
                          label="Instagram"
                          fullWidth
                          multiline
                          maxRows={5}
                          variant="standard"
                          value={values.webHeroText}
                          onChange={handleChange("webHeroText")}
                          onBlur={handleBlur("webHeroText")}
                          sx={{ p: 2 }}
                        />
                        {touched.webHeroText && errors.webHeroText && (
                          <p style={{ color: "red" }}>{errors.webHeroText}</p>
                        )}
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          required
                          id="books"
                          name="books"
                          label="Books"
                          fullWidth
                          multiline
                          maxRows={5}
                          variant="standard"
                          value={values.books}
                          onChange={handleChange("books")}
                          onBlur={handleBlur("books")}
                          sx={{ p: 2 }}
                        />
                        {touched.books && errors.books && (
                          <p style={{ color: "red" }}>{errors.books}</p>
                        )}
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Button
                          variant="contained"
                          component="label"
                          size="small"
                          onChange={handleChange("webLogo")}
                          onBlur={handleBlur("webLogo")}
                          color="common"
                        >
                          Logo
                          <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            hidden
                            name="webLogo"
                          />
                        </Button>
                        <div>
                          {errors.webLogo && touched.webLogo && (
                            <p style={{ color: "red" }}>{errors.webLogo}</p>
                          )}
                        </div>
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
        {/* </>
      ) : (
        <Error message="Something went wrong, please try again later!" />
      )} */}
    </div>
  );
}

export default Website;
