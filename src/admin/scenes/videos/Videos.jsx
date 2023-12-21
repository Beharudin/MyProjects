import {
  Box,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import Notifications from "../../../components/common/Notifications";
import {
  createVideoData,
  deleteVideoData,
  updateVideoData,
} from "../../../store/video/videoActions";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import "./videos.css";
import { showNotificationMessage } from "../../../store/uiSlice";

function Videos() {
  const [openEditVideoModal, setOpenEditVideoModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [openAddVideoModal, setOpenAddVideoModal] = useState(false);
  const [videoTopic, setVideoTopic] = useState("");
  const [videoBody, setVideoBody] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [modalId, setModalId] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video.videosList);
  const notification = useSelector((state) => state.ui.notification);

  const addVideo = async (topic, body, link) => {
    try {
      setLoading(true);
      dispatch(
        createVideoData({
          topic: topic,
          body: body,
          link: link,
        })
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const updateVideo = async (id, topic, body, link) => {
    try {
      setLoading(true);
      dispatch(
        updateVideoData({
          id,
          topic: topic,
          body: body,
          link: link,
        })
      );
      Swal.fire("Congratulations!", "Video updated successfully!", "success");
      setLoading(false);
    } catch (error) {
      Swal.fire("Sorry!", "Something went wrong!", "error");
      setLoading(false);
    }
  };
  const deleteVideo = async (id) => {
    try {
      setLoading(true);
      dispatch(deleteVideoData(id));
      Swal.fire("Congratulations!", "Video deleted successfully!", "success");
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

  const handleOpenVideoModal = (id, topic, body, link) => {
    setVideoTopic(topic);
    setVideoBody(body);
    setVideoLink(link);
    setModalId(id);
    setOpenVideoModal(true);
  };
  const handleCloseVideoModal = () => {
    setOpenVideoModal(false);
  };

  const handleOpenEditVideoModal = () => {
    setOpenVideoModal(false);
    setOpenEditVideoModal(true);
  };
  const handleCloseEditVideoModal = () => {
    setOpenEditVideoModal(false);
  };

  const handleOpenAddVideoModal = () => {
    dispatch(
      showNotificationMessage({
        open: false,
      })
    );
    setOpenAddVideoModal(true);
  };
  const handleCloseAddVideoModal = () => {
    setOpenAddVideoModal(false);
  };

  const addInitialValues = {
    VideoTopic: "",
    videoBody: "",
    videoLink: "",
  };
  const editInitialValues = {
    VideoTopic: videoTopic,
    videoBody: videoBody,
    videoLink: videoLink,
  };

  const videoInitSchema = Yup.object().shape({
    VideoTopic: Yup.string().required("Video topic is required"),
    videoBody: Yup.string().required("Video body is required"),
    videoLink: Yup.string().required("Video link is required"),
  });

  return (
    <div id="videos" className="container">
      {loading ? (
        <Loader />
      ) : videos.length ? (
        <>
          <Box sx={{ display: "flex" }}>
            <div className="col col-xs-12 col-sm-3">
              <Header title="Videos" subtitle="Videos we provide" />
            </div>
            <div className="d-flex justify-content-end col col-xs-12 col-sm-8">
              <Link className="Link">
                <button className="apply-btn" onClick={handleOpenAddVideoModal}>
                  Add New
                </button>
              </Link>
            </div>
          </Box>
          <div className="text-center">
            <div className="row p-5">
              {videos
                ? videos.map((data, index) => (
                    <div
                      key={`${data.topic}-${index}`}
                      className="col-xs-6 col-md-3"
                    >
                      <h3>{data.topic}</h3>
                      <p className="video-text">{data.body}</p>
                      <Link className="Link">
                        <button
                          className="apply-btn mb-5"
                          onClick={() =>
                            handleOpenVideoModal(
                              data.id,
                              data.topic,
                              data.body,
                              data.link
                            )
                          }
                        >
                          View more
                        </button>
                      </Link>
                    </div>
                  ))
                : "Loading..."}
            </div>
            <Modal open={openVideoModal} onClose={handleCloseVideoModal}>
              <Box sx={style}>
                <div className="video-desc">
                  <div className="text-center">
                    <h3>{videoTopic}</h3>
                  </div>
                  <p className="video-text">{videoBody}</p>
                  <div className="linksDiv d-flex justify-content-center">
                    <button
                      className="apply-btn"
                      onClick={handleOpenEditVideoModal}
                    >
                      Edit
                    </button>
                    <button
                      className="apply-btn"
                      onClick={() => {
                        handleCloseVideoModal();
                        deleteVideo(modalId);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="apply-btn"
                      onClick={handleCloseVideoModal}
                    >
                      close
                    </button>
                  </div>
                </div>
              </Box>
            </Modal>
            <Modal
              open={openEditVideoModal}
              onClose={handleCloseEditVideoModal}
            >
              <Box sx={style}>
                <Formik
                  enableReinitialize
                  initialValues={editInitialValues}
                  validationSchema={videoInitSchema}
                  validateOnMount={true}
                  onSubmit={(values) => {
                    updateVideo(
                      modalId,
                      values.VideoTopic,
                      values.videoBody,
                      values.videoLink
                    );
                    setOpenEditVideoModal(false);
                  }}
                >
                  {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                      <Typography variant="h6" gutterBottom>
                        Video information
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="VideoTopic"
                            name="VideoTopic"
                            label="Video Topic"
                            fullWidth
                            variant="standard"
                            value={values.VideoTopic}
                            onChange={handleChange("VideoTopic")}
                            onBlur={handleBlur("VideoTopic")}
                            sx={{ p: 2 }}
                          />
                          {touched.VideoTopic && errors.VideoTopic && (
                            <p style={{ color: "red" }}>{errors.VideoTopic}</p>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            id="videoBody"
                            name="videoBody"
                            label="Video Body"
                            value={values.videoBody}
                            multiline
                            maxRows={10}
                            fullWidth
                            variant="standard"
                            onChange={handleChange("videoBody")}
                            onBlur={handleBlur("videoBody")}
                            sx={{ p: 2 }}
                          />
                          {touched.videoBody && errors.videoBody && (
                            <p style={{ color: "red" }}>{errors.videoBody}</p>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            id="videoLink"
                            name="videoLink"
                            label="Video Link"
                            value={values.videoLink}
                            multiline
                            maxRows={10}
                            fullWidth
                            variant="standard"
                            onChange={handleChange("videoLink")}
                            onBlur={handleBlur("videoLink")}
                            sx={{ p: 2 }}
                          />
                          {touched.videoLink && errors.videoLink && (
                            <p style={{ color: "red" }}>{errors.videoLink}</p>
                          )}
                        </Grid>
                      </Grid>
                      <div className="video-desc">
                        <div className="linksDiv d-flex justify-content-center">
                          <button className="apply-btn" type="submit">
                            Update
                          </button>
                          <button
                            className="apply-btn"
                            onClick={handleCloseEditVideoModal}
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
            <Modal open={openAddVideoModal} onClose={handleCloseAddVideoModal}>
              <Box sx={style}>
                {notification && (
                  <Notifications
                    type={notification.type}
                    message={notification.message}
                  />
                )}
                <Formik
                  enableReinitialize
                  initialValues={addInitialValues}
                  validationSchema={videoInitSchema}
                  validateOnMount={true}
                  onSubmit={(values, actions) => {
                    addVideo(
                      values.VideoTopic,
                      values.videoBody,
                      values.videoLink
                    );
                    actions.resetForm();
                  }}
                >
                  {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                      <Typography variant="h6" gutterBottom>
                        Video information
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="VideoTopic"
                            name="VideoTopic"
                            label="Video Topic"
                            fullWidth
                            variant="standard"
                            value={values.VideoTopic}
                            onChange={handleChange("VideoTopic")}
                            onBlur={handleBlur("VideoTopic")}
                            sx={{ p: 2 }}
                          />
                          {touched.VideoTopic && errors.VideoTopic && (
                            <p style={{ color: "red" }}>{errors.VideoTopic}</p>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            id="videoBody"
                            name="videoBody"
                            label="Video Description"
                            value={values.videoBody}
                            multiline
                            maxRows={10}
                            fullWidth
                            variant="standard"
                            onChange={handleChange("videoBody")}
                            onBlur={handleBlur("videoBody")}
                            sx={{ p: 2 }}
                          />
                          {touched.videoBody && errors.videoBody && (
                            <p style={{ color: "red" }}>{errors.videoBody}</p>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            id="videoLink"
                            name="videoLink"
                            label="Video Link"
                            value={values.videoLink}
                            multiline
                            maxRows={10}
                            fullWidth
                            variant="standard"
                            onChange={handleChange("videoLink")}
                            onBlur={handleBlur("videoLink")}
                            sx={{ p: 2 }}
                          />
                          {touched.videoLink && errors.videoLink && (
                            <p style={{ color: "red" }}>{errors.videoLink}</p>
                          )}
                        </Grid>
                      </Grid>
                      <div className="video-desc">
                        <div className="linksDiv d-flex justify-content-center">
                          <button className="apply-btn">Save</button>
                          <button
                            className="apply-btn"
                            onClick={handleCloseAddVideoModal}
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

export default Videos;
