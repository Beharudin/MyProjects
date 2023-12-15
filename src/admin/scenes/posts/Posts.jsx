import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "./posts.css";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { Close } from "@mui/icons-material";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [openEditPostModal, setOpenEditPostModal] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [openAddPostModal, setOpenAddPostModal] = useState(false);
  const [postTopic, setpostTopic] = useState("");
  const [postBody, setPostBody] = useState("");
  const [modalId, setModalId] = useState();
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  // if (!user.length) {
  //   setLoading(true);
  //   window.location.href = "/admin/login";
  // } 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        await axios.get("http://localhost:3001/api/posts/").then((res) => {
          setPosts(res.data.data);
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const addPost = async (topic, body) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:3001/api/posts/", {
        topic: topic,
        body: body,
      });
      setError(false);
      setSuccess(true);
      setMsg("Post added successfully!");
      await axios.get("http://localhost:3001/api/posts/").then((res) => {
        setPosts(res.data.data);
      });
      setLoading(false);
    } catch (error) {
      setSuccess(false);
      setError(true);
      setMsg("Something went wrong!");
      setLoading(false);
    }
  };

  const updatePost = async (id, topic, body) => {
    try {
      setLoading(true);
      await axios.patch(`http://localhost:3001/api/posts/${id}`, {
        topic: topic,
        body: body,
      });
      Swal.fire("Congratulations!", "Post updated successfully!", "success");
      await axios.get("http://localhost:3001/api/posts/").then((res) => {
        setPosts(res.data.data);
      });
      setLoading(false);
    } catch (error) {
      Swal.fire("Sorry!", "Something went wrong!", "error");
      setLoading(false);
    }
  };
  const deletePost = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3001/api/posts/${id}`);
      Swal.fire("Congratulations!", "Post deleted successfully!", "success");
      await axios.get("http://localhost:3001/api/posts/").then((res) => {
        setPosts(res.data.data);
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

  const handleOpenPostModal = (id, topic, body) => {
    setpostTopic(topic);
    setPostBody(body);
    setModalId(id);
    setOpenPostModal(true);
  };
  const handleClosePostModal = () => {
    setOpenPostModal(false);
  };

  const handleOpenEditPostModal = () => {
    setOpenPostModal(false);
    setOpenEditPostModal(true);
  };
  const handleCloseEditPostModal = () => {
    setOpenEditPostModal(false);
  };

  const handleOpenAddPostModal = () => {
    setOpenAddPostModal(true);
  };
  const handleCloseAddPostModal = () => {
    setOpenAddPostModal(false);
  };

  const addInitialValues = {
    postTopic: "",
    postBody: "",
  };
  const editInitialValues = {
    postTopic: postTopic,
    postBody: postBody,
  };

  const postInitSchema = Yup.object().shape({
    postTopic: Yup.string().required("Post topic is required"),
    postBody: Yup.string().required("Post body is required"),
  });

  return (
    <div id="Posts" className="container">
      {loading ? (
        <Loader />
      ) : posts.length ? (
        <>
      <Box sx={{ display: "flex" }}>
        <div className="col col-xs-12 col-sm-3">
          <Header title="Posts" subtitle="Posts we provide" />
        </div>
        <div className="d-flex justify-content-end col col-xs-12 col-sm-8">
          <Link className="Link">
            <button className="apply-btn" onClick={handleOpenAddPostModal}>
              Add New
            </button>
          </Link>
        </div>
      </Box>
      <div className="text-center">
        <div className="row p-5">
          {posts
            ? posts.map((data, index) => (
                <div
                  key={`${data.topic}-${index}`}
                  className="col-xs-6 col-md-3"
                >
                  <h3>{data.topic}</h3>
                  <p className="post-text">{data.body}</p>
                  <Link className="Link">
                    <button
                      className="apply-btn mb-5"
                      onClick={() =>
                        handleOpenPostModal(
                          data.id,
                          data.topic,
                          data.body
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
        <Modal open={openPostModal} onClose={handleClosePostModal}>
          <Box sx={style}>
            <div className="post-desc">
              <div className="text-center">
                <h3>{postTopic}</h3>
              </div>
              <p className="post-text">{postBody}</p>
              <div className="linksDiv d-flex justify-content-center">
                <button className="apply-btn" onClick={handleOpenEditPostModal}>
                  Edit
                </button>
                <button
                  className="apply-btn"
                  onClick={() => {
                    handleClosePostModal();
                    deletePost(modalId);
                  }}
                >
                  Delete
                </button>
                <button className="apply-btn" onClick={handleClosePostModal}>
                  close
                </button>
              </div>
            </div>
          </Box>
        </Modal>
        <Modal open={openEditPostModal} onClose={handleCloseEditPostModal}>
          <Box sx={style}>
            <Formik
              enableReinitialize
              initialValues={editInitialValues}
              validationSchema={postInitSchema}
              validateOnMount={true}
              onSubmit={(values) => {
                updatePost(
                  modalId,
                  values.postTopic,
                  values.postBody
                );
                setOpenEditPostModal(false);
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Typography variant="h6" gutterBottom>
                    Post information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="postTopic"
                        name="postTopic"
                        label="Post Topic"
                        fullWidth
                        variant="standard"
                        value={values.postTopic}
                        onChange={handleChange("postTopic")}
                        onBlur={handleBlur("postTopic")}
                        sx={{ p: 2 }}
                      />
                      {touched.postTopic && errors.postTopic && (
                        <p style={{ color: "red" }}>{errors.postTopic}</p>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="postBody"
                        name="postBody"
                        label="Post Body"
                        value={values.postBody}
                        multiline
                        maxRows={10}
                        fullWidth
                        variant="standard"
                        onChange={handleChange("postBody")}
                        onBlur={handleBlur("postBody")}
                        sx={{ p: 2 }}
                      />
                      {touched.postBody && errors.postBody && (
                        <p style={{ color: "red" }}>{errors.postBody}</p>
                      )}
                    </Grid>
                  </Grid>
                  <div className="post-desc">
                    <div className="linksDiv d-flex justify-content-center">
                      <button className="apply-btn" type="submit">
                        Update
                      </button>
                      <button
                        className="apply-btn"
                        onClick={handleCloseEditPostModal}
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
        <Modal open={openAddPostModal} onClose={handleCloseAddPostModal}>
          <Box sx={style}>
            {error && (
              <div
                className="alert alert-danger d-flex justify-content-between"
                role="alert"
              >
                {msg}
                <IconButton onClick={() => setError(false)} sx={{ p: 0 }}>
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
                <IconButton onClick={() => setSuccess(false)} sx={{ p: 0 }}>
                  {<Close />}
                </IconButton>
              </div>
            )}
            <Formik
              enableReinitialize
              initialValues={addInitialValues}
              validationSchema={postInitSchema}
              validateOnMount={true}
              onSubmit={(values, actions) => {
                addPost(values.postTopic, values.postBody);
                actions.resetForm();
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Typography variant="h6" gutterBottom>
                    Post information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="postTopic"
                        name="postTopic"
                        label="Post Topic"
                        fullWidth
                        variant="standard"
                        value={values.postTopic}
                        onChange={handleChange("postTopic")}
                        onBlur={handleBlur("postTopic")}
                        sx={{ p: 2 }}
                      />
                      {touched.postTopic && errors.postTopic && (
                        <p style={{ color: "red" }}>{errors.postTopic}</p>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="postBody"
                        name="postBody"
                        label="Loan Body"
                        value={values.postBody}
                        multiline
                        maxRows={10}
                        fullWidth
                        variant="standard"
                        onChange={handleChange("postBody")}
                        onBlur={handleBlur("postBody")}
                        sx={{ p: 2 }}
                      />
                      {touched.postBody && errors.postBody && (
                        <p style={{ color: "red" }}>{errors.postBody}</p>
                      )}
                    </Grid>
                  </Grid>
                  <div className="post-desc">
                    <div className="linksDiv d-flex justify-content-center">
                      <button className="apply-btn">Save</button>
                      <button
                        className="apply-btn"
                        onClick={handleCloseAddPostModal}
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

export default Posts;
