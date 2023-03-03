import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Modal,
  Paper,
  TextField,
} from "@mui/material";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";
import { Link, NavLink } from "react-router-dom";
import { MoreHoriz } from "@mui/icons-material";
import "./faq.css";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const FAQ = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditFaqModal, setOpenEditFaqModal] = useState(false);
  const [openAddFaqModal, setOpenAddFaqModal] = useState(false);
  const [editModalQuestion, setEditModalQuestion] = useState("");
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
    setEditModalQuestion(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo loborti eget."
    );
  }, []);

  const handleOpenEditFaqModal = () => {
    setOpenEditFaqModal(true);
    setAnchorEl(null);
  };
  const handleCloseEditFaqModal = () => {
    setOpenEditFaqModal(false);
  };

  const editInitialValues = {
    clientQuestion: editModalQuestion,
  };

  const initSchema = Yup.object().shape({
    clientQuestion: Yup.string().required("Client question is required"),
  });

  const handleOpenAddFaqModal = () => {
    setOpenAddFaqModal(true);
    setAnchorEl(null);
  };
  const handleCloseAddFaqModal = () => {
    setOpenAddFaqModal(false);
  };

  const addInitialValues = {
    clientQuestion: "",
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
          <Header title="FAQ" subtitle="Frequently asked questions" />
        </div>
        <div className="d-flex justify-content-end col col-xs-12 col-sm-8">
          <Link className="Link">
            <button className="apply-btn" onClick={handleOpenAddFaqModal}>
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
              <div className="userQuestion">
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
                onClose={handleOpenEditFaqModal}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleOpenEditFaqModal}>Edit</MenuItem>
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
              <div className="userQuestion">
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
              <div className="userQuestion">
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
              <div className="userQuestion">
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
              <div className="userQuestion">
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
      <Modal open={openEditFaqModal} onClose={handleCloseEditFaqModal}>
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
                  Edit Question
                </Typography>
                <Grid container spacing={3}>
                  
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="clientQuestion"
                      name="clientQuestion"
                      label="Client question"
                      value={values.clientQuestion}
                      multiline
                      maxRows={10}
                      fullWidth
                      variant="standard"
                      onChange={handleChange("clientQuestion")}
                      onBlur={handleBlur("clientQuestion")}
                      sx={{ p: 2 }}
                    />
                    {touched.clientQuestion && errors.clientQuestion && (
                      <p style={{ color: "red" }}>{errors.clientQuestion}</p>
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
                  onClick={handleCloseEditFaqModal}
                >
                  close
                </button>
              </Link>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal open={openAddFaqModal} onClose={handleCloseAddFaqModal}>
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
                  Add Question
                </Typography>
                <Grid container spacing={3}>
                 
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="clientQuestion"
                      name="clientQuestion"
                      label="Client question"
                      value={values.clientQuestion}
                      multiline
                      maxRows={10}
                      fullWidth
                      variant="standard"
                      onChange={handleChange("clientQuestion")}
                      onBlur={handleBlur("clientQuestion")}
                      sx={{ p: 2 }}
                    />
                    {touched.clientQuestion && errors.clientQuestion && (
                      <p style={{ color: "red" }}>{errors.clientQuestion}</p>
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
                <button className="apply-btn" onClick={handleCloseAddFaqModal}>
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

export default FAQ;
