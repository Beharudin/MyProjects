import React from "react";
import "./novels.css";
import { Link } from "react-router-dom";
import {
  Grid,
  Modal,
  TextField,
  Typography,
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
  const [novels, setNovels] = useState([]);
  const [openEditNovelModal, setOpenEditNovelModal] = useState(false);
  const [openNovelModal, setOpenNovelModal] = useState(false);
  const [openAddNovelModal, setOpenAddNovelModal] = useState(false);
  const [modalTopic, setModalTopic] = useState();
  const [modalSection, setModalSection] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalId, setModalId] = useState();
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  if(!user.length){
    setLoading(true);
    window.location.href='/admin/login'
  }
  
  useEffect(() => {
    const fetchNovels = async () => {
      try {
        setLoading(true);
        await axios.get("http://localhost:3001/api/novels/").then((res) => {
          setNovels(res.data.data);
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchNovels();
  }, []);

  const addNovel = async (topic, section, body) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:3001/api/novels/", {
        topic: topic,
        section: section,
        body: body
      });
      setError(false);
      setSuccess(true);
      setMsg("Novel added successfully!");
      await axios.get("http://localhost:3001/api/novels/").then((res) => {
        setNovels(res.data.data);
      });
      setLoading(false);
    } catch (error) {
      setSuccess(false);
      setError(true);
      setMsg("Something went wrong!");
      setLoading(false);
    }
  };

  const updateNovel = async (id, topic, section, body) => {
    try {
      setLoading(true);
      await axios.patch(`http://localhost:3001/api/novels/${id}`, {
        topic: topic,
        section: section,
        body: body
      });
      Swal.fire("Congratulations!", "Novel updated successfully!", "success");
      await axios.get("http://localhost:3001/api/novels/").then((res) => {
        setNovels(res.data.data);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      Swal.fire("Sorry!", "Something went wrong!", "error");
      setLoading(false);
    }
  };
  const deleteNovel = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3001/api/novels/${id}`);

      Swal.fire("Congratulations!", "Novel deleted successfully!", "success");
      await axios.get("http://localhost:3001/api/novels/").then((res) => {
        setNovels(res.data.data);
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

  const handleOpenNovelModal = (id, topic, section, body) => {
    setModalId(id);
    setModalTopic(topic);
    setModalSection(section);
    setModalBody(body);
    setOpenNovelModal(true);
  };
  const handleCloseNovelModal = () => {
    setOpenNovelModal(false);
  };

  const handleOpenEditNovelModal = () => {
    setOpenNovelModal(false);
    setOpenEditNovelModal(true);
  };
  const handleCloseEditNovelModal = () => {
    setOpenEditNovelModal(false);
  };

  const handleOpenAddNovelModal = () => {
    setOpenAddNovelModal(true);
  };
  const handleCloseAddNovelModal = () => {
    setOpenAddNovelModal(false);
  };

  const addInitialValues = {
    novelTopic: "",
    novelSection: "",
    novelBody: "",
  };
  const editInitialValues = {
    novelTopic: modalTopic,
    novelSection: modalSection,
    novelBody: modalBody,
  };

  const NovelInitSchema = Yup.object().shape({
    novelTopic: Yup.string().required("Novel topic is required"),
    novelBody: Yup.string().required("Novel section is required"),
    novelBody: Yup.mixed().required("Novel body is required"),
  });

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : novels.length ? (
        <>
      <Box sx={{ display: "flex" }}>
        <div className="col col-xs-12 col-sm-3">
          <Header
            title="Novels"
            subtitle="Novels we provide for our customers"
          />
        </div>
        <div className="d-flex justify-content-end col col-xs-12 col-sm-8">
          <Link className="Link">
            <button className="apply-btn" onClick={handleOpenAddNovelModal}>
              Add New
            </button>
          </Link>
        </div>
      </Box>
      <div className=" text-center">
        <div className="row">
          {novels
            ? novels.map((novel, index) => (
                <>
                  <div
                    key={`${novel.topic}-${index}`}
                    className="col-md-4"
                  >
                    <div className="novel-desc">
                      <h3>{novel.topic} {novel.section}</h3>
                      <p className="novel-text">{novel.body}</p>
                      <Link className="Link">
                        <button
                          className="apply-btn"
                          onClick={() =>
                            handleOpenNovelModal(
                              novel.id,
                              novel.topic,
                              novel.section,
                              novel.body
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
        <Modal open={openNovelModal} onClose={handleCloseNovelModal}>
          <Box sx={style}>
            <div className="Novel-desc">
              <div className="text-center">
                <h3>{modalTopic} {modalSection}</h3>
              </div>
              <p className="Novel-text">{modalBody}</p>
              <div className="linksDiv d-flex justify-content-center">
                <button
                  className="apply-btn"
                  onClick={handleOpenEditNovelModal}
                >
                  Edit
                </button>
                <button
                  className="apply-btn"
                  onClick={() => {
                    handleCloseNovelModal();
                    deleteNovel(modalId);
                  }}
                >
                  Delete
                </button>
                <button className="apply-btn" onClick={handleCloseNovelModal}>
                  close
                </button>
              </div>
            </div>
          </Box>
        </Modal>
        <Modal
          open={openEditNovelModal}
          onClose={handleCloseEditNovelModal}
        >
          <Box sx={style}>
            <Formik
              enableReinitialize
              initialValues={editInitialValues}
              validationSchema={NovelInitSchema}
              validateOnMount={true}
              onSubmit={(values) => {
                updateNovel(
                  modalId,
                  values.novelTopic,
                  values.novelSection,
                  values.novelBody
                );
                setOpenEditNovelModal(false);
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Typography variant="h6" gutterBottom>
                    Novel information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="novelTopic"
                        name="novelTopic"
                        label="Novel Topic"
                        fullWidth
                        variant="standard"
                        value={values.novelTopic}
                        onChange={handleChange("novelTopic")}
                        onBlur={handleBlur("novelTopic")}
                        sx={{ p: 2 }}
                      />
                      {touched.novelTopic && errors.novelTopic && (
                        <p style={{ color: "red" }}>{errors.novelTopic}</p>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="novelSection"
                        name="novelSection"
                        label="Novel Section"
                        fullWidth
                        variant="standard"
                        value={values.novelSection}
                        onChange={handleChange("novelSection")}
                        onBlur={handleBlur("novelSection")}
                        sx={{ p: 2 }}
                      />
                      {touched.novelSection && errors.novelSection && (
                        <p style={{ color: "red" }}>{errors.novelSection}</p>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="novelBody"
                        name="novelBody"
                        label="Novel Body"
                        value={values.novelBody}
                        multiline
                        maxRows={10}
                        fullWidth
                        variant="standard"
                        onChange={handleChange("novelBody")}
                        onBlur={handleBlur("novelBody")}
                        sx={{ p: 2 }}
                      />
                      {touched.novelBody && errors.novelBody && (
                        <p style={{ color: "red" }}>{errors.novelBody}</p>
                      )}
                    </Grid>
                  </Grid>
                  <div className="Novel-desc">
                    <div className="linksDiv d-flex justify-content-center">
                      <button className="apply-btn" type="submit">
                        Update
                      </button>
                      <button
                        className="apply-btn"
                        onClick={handleCloseEditNovelModal}
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
        <Modal open={openAddNovelModal} onClose={handleCloseAddNovelModal}>
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
              validationSchema={NovelInitSchema}
              validateOnMount={true}
              onSubmit={(values, actions) => {
                addNovel(
                  values.novelTopic,
                  values.novelSection,
                  values.novelBody
                );
                actions.resetForm();
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Typography variant="h6" gutterBottom>
                    Novel information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="novelTopic"
                        name="novelTopic"
                        label="Novel Topic"
                        fullWidth
                        variant="standard"
                        value={values.novelTopic}
                        onChange={handleChange("novelTopic")}
                        onBlur={handleBlur("novelTopic")}
                        sx={{ p: 2 }}
                      />
                      {touched.novelTopic && errors.novelTopic && (
                        <p style={{ color: "red" }}>{errors.novelTopic}</p>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="novelSection"
                        name="novelSection"
                        label="Novel Section"
                        fullWidth
                        variant="standard"
                        value={values.novelSection}
                        onChange={handleChange("novelSection")}
                        onBlur={handleBlur("novelSection")}
                        sx={{ p: 2 }}
                      />
                      {touched.novelSection && errors.novelSection && (
                        <p style={{ color: "red" }}>{errors.novelSection}</p>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="novelBody"
                        name="novelBody"
                        label="Novel Body"
                        value={values.novelBody}
                        multiline
                        maxRows={10}
                        fullWidth
                        variant="standard"
                        onChange={handleChange("novelBody")}
                        onBlur={handleBlur("novelBody")}
                        sx={{ p: 2 }}
                      />
                      {touched.novelBody && errors.novelBody && (
                        <p style={{ color: "red" }}>{errors.novelBody}</p>
                      )}
                    </Grid>
                  </Grid>
                  <div className="Novel-desc">
                    <div className="linksDiv d-flex justify-content-center">
                      <button className="apply-btn" type="submit">
                        Save
                      </button>
                      <button
                        className="apply-btn"
                        onClick={handleCloseAddNovelModal}
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
      </>
      ) : (
        <Error message="Something went wrong, please try again later!" />
      )}
    </div>
  );
}
export default Novels;
