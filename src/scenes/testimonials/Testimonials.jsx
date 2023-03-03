import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Modal,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";
import { Link, NavLink } from "react-router-dom";
import {MoreHoriz } from "@mui/icons-material";
import "./testimonials.css";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const Testimonials = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditTestimonialsModal, setOpenEditTestimonialsModal] = useState(false);
  const [openAddTestimonialsModal, setOpenAddTestimonialsModal] = useState(false);
  const [editModalClientName, seteditModalClientName] = useState("");
  const [editModalClientComment, seteditModalClientComment] = useState("");
  const open = Boolean(anchorEl);

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
    seteditModalClientName("Hana Tibebu");
    seteditModalClientComment('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo loborti eget.');
  }, []);

  const handleOpenEditTestimonialsModal = () => {
    setOpenEditTestimonialsModal(true);
    setAnchorEl(null);
  };
  const handleCloseEditTestimonialsModal = () => {
    setOpenEditTestimonialsModal(false);
  };

  const editInitialValues = {
    clientComment: editModalClientComment,
    clientName: editModalClientName,
  };

  const initSchema = Yup.object().shape({
    clientComment: Yup.string().required("Client comment is required"),
    clientName: Yup.string().required("Client name is required"),
  });

  const handleOpenAddTestimonialsModal = () => {
    setOpenAddTestimonialsModal(true);
    setAnchorEl(null);
  };
  const handleCloseAddTestimonialsModal = () => {
    setOpenAddTestimonialsModal(false);
  };

  const addInitialValues = {
    clientComment: '',
    clientName: '',
  };


  const handleEdit = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDelete = (event) => {
    setAnchorEl(null);
    alert("Delete clicked");
  };

  return (
    <Box m="20px">
      <Box sx={{ display: "flex" }}>
        <div className="col col-xs-12 col-sm-3">
          <Header title="Testimonials" subtitle="What our clients say" />
        </div>
        <div className="d-flex justify-content-end col col-xs-12 col-sm-8">
          <Link className="Link">
            <button
              className="apply-btn"
              onClick={handleOpenAddTestimonialsModal}
            >
              Add New
            </button>
          </Link>
        </div>
      </Box>

      <Paper
        variant="outlined"
        sx={{
          my: { xs: 2, md: 1 },
          mx: { xs: 1, md: 2 },
          p: { md: 2 },
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          width: { xs: "100%", md: "80%" },
        }}
      >
        <NavLink className="nav-link">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              position: "relative",
            }}
          >
            <Box sx={{ xs: 11 }}>
              <h1 className="user">
                <Typography
                  variant="h4"
                  sx={{
                    zIndex: "2",
                    background: "#FFF",
                    display: "inline",
                    position: "relative",
                    padding: "0 15px",
                  }}
                >
                  Hana Tibebu
                </Typography>
              </h1>
              <div className="userMessage">
                <Typography
                  sx={{
                    zIndex: "2",
                    background: "#FFF",
                    display: "inline",
                    position: "relative",
                    padding: "0 15px",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </div>
            </Box>

            <div className="more">
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleEdit}
              >
                <MoreHoriz sx={{ color: "#bebebe" }} />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleOpenEditTestimonialsModal}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleOpenEditTestimonialsModal}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </div>
          </div>
        </NavLink>
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          my: { xs: 2, md: 1 },
          mx: { xs: 1, md: 2 },
          p: { md: 2 },
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          width: { xs: "100%", md: "80%" },
        }}
      >
        
        <NavLink className="nav-link">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div className="col col-xs-10 ">
              <h1 className="user">
                <Typography
                  variant="h4"
                  sx={{
                    zIndex: "2",
                    background: "#FFF",
                    display: "inline",
                    position: "relative",
                    padding: "0 15px",
                  }}
                >
                  Sara Abreham
                </Typography>
              </h1>
              <div className="userMessage">
                <Typography
                  sx={{
                    zIndex: "2",
                    background: "#FFF",
                    display: "inline",
                    position: "relative",
                    padding: "0 15px",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </div>
            </div>

            <div className="more">
              <MoreHoriz sx={{ color: "#bebebe" }} />
            </div>
          </div>
        </NavLink>
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          my: { xs: 2, md: 1 },
          mx: { xs: 1, md: 2 },
          p: { md: 2 },
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          width: { xs: "100%", md: "80%" },
        }}
      >
        
        <NavLink className="nav-link">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div className="col col-xs-10 ">
              <h1 className="user">
                <Typography
                  variant="h4"
                  sx={{
                    zIndex: "2",
                    background: "#FFF",
                    display: "inline",
                    position: "relative",
                    padding: "0 15px",
                  }}
                >
                  Kemal Sheka
                </Typography>
              </h1>
              <div className="userMessage">
                <Typography
                  sx={{
                    zIndex: "2",
                    background: "#FFF",
                    display: "inline",
                    position: "relative",
                    padding: "0 15px",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </div>
            </div>

            <div className="more">
              <MoreHoriz sx={{ color: "#bebebe" }} />
            </div>
          </div>
        </NavLink>
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          my: { xs: 2, md: 1 },
          mx: { xs: 1, md: 2 },
          p: { md: 2 },
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          width: { xs: "100%", md: "80%" },
        }}
      >
        
        <NavLink className="nav-link">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div className="col col-xs-10 ">
              <h1 className="user">
                <Typography
                  variant="h4"
                  sx={{
                    zIndex: "2",
                    background: "#FFF",
                    display: "inline",
                    position: "relative",
                    padding: "0 15px",
                  }}
                >
                  Bini Man
                </Typography>
              </h1>
              <div className="userMessage">
                <Typography
                  sx={{
                    zIndex: "2",
                    background: "#FFF",
                    display: "inline",
                    position: "relative",
                    padding: "0 15px",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </div>
            </div>

            <div className="more">
              <MoreHoriz sx={{ color: "#bebebe" }} />
            </div>
          </div>
        </NavLink>
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          my: { xs: 2, md: 1 },
          mx: { xs: 1, md: 2 },
          p: { md: 2 },
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          width: { xs: "100%", md: "80%" },
        }}
      >
        
        <NavLink className="nav-link">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div className="col col-xs-10 ">
              <h1 className="user">
                <Typography
                  variant="h4"
                  sx={{
                    zIndex: "2",
                    background: "#FFF",
                    display: "inline",
                    position: "relative",
                    padding: "0 15px",
                  }}
                >
                  Helen Berihe
                </Typography>
              </h1>
              <div className="userMessage">
                <Typography
                  sx={{
                    zIndex: "2",
                    background: "#FFF",
                    display: "inline",

                    position: "relative",
                    padding: "0 15px",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </div>
            </div>

            <div className="more">
              <MoreHoriz sx={{ color: "#bebebe" }} />
            </div>
          </div>
        </NavLink>
      </Paper>
      <Modal open={openEditTestimonialsModal} onClose={handleCloseEditTestimonialsModal}>
        <Box sx={style}>
          <Formik
            enableReinitialize
            initialValues={editInitialValues}
            validationSchema={initSchema}
            validateOnMount={true}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Typography variant="h6" gutterBottom>
                  Edit Testimonals
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="clientName"
                      name="clientName"
                      label="Client name"
                      fullWidth
                      multiline
                      maxRows={5}
                      variant="standard"
                      value={values.clientName}
                      onChange={handleChange("clientName")}
                      onBlur={handleBlur("clientName")}
                      sx={{ p: 2 }}
                    />
                    {touched.clientName && errors.clientName && (
                      <p style={{ color: "red" }}>{errors.clientName}</p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="clientComment"
                      name="clientComment"
                      label="Client comment"
                      value={values.clientComment}
                      multiline
                      maxRows={10}
                      fullWidth
                      variant="standard"
                      onChange={handleChange("clientComment")}
                      onBlur={handleBlur("clientComment")}
                      sx={{ p: 2 }}
                    />
                    {touched.clientComment && errors.clientComment && (
                      <p style={{ color: "red" }}>{errors.clientComment}</p>
                    )}
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
                  onClick={handleCloseEditTestimonialsModal}
                >
                  close
                </button>
              </Link>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal open={openAddTestimonialsModal} onClose={handleCloseAddTestimonialsModal}>
        <Box sx={style}>
          <Formik
            enableReinitialize
            initialValues={addInitialValues}
            validationSchema={initSchema}
            validateOnMount={true}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Typography variant="h6" gutterBottom>
                  Add Testimonals
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="clientName"
                      name="clientName"
                      label="Client name"
                      fullWidth
                      multiline
                      maxRows={5}
                      variant="standard"
                      value={values.clientName}
                      onChange={handleChange("clientName")}
                      onBlur={handleBlur("clientName")}
                      sx={{ p: 2 }}
                    />
                    {touched.clientName && errors.clientName && (
                      <p style={{ color: "red" }}>{errors.clientName}</p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="clientComment"
                      name="clientComment"
                      label="Client comment"
                      value={values.clientComment}
                      multiline
                      maxRows={10}
                      fullWidth
                      variant="standard"
                      onChange={handleChange("clientComment")}
                      onBlur={handleBlur("clientComment")}
                      sx={{ p: 2 }}
                    />
                    {touched.clientComment && errors.clientComment && (
                      <p style={{ color: "red" }}>{errors.clientComment}</p>
                    )}
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
                  onClick={handleCloseAddTestimonialsModal}
                >
                  close
                </button>
              </Link>
            </div>
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

export default Testimonials;
