import {
  createPost,
  getPostById,
  getPosts,
  updatePost,
  deletePost,
} from "./post_controller.js";
import express from "express";
const router = express.Router();
// import { checkToken } from "../../auth/token_validation.js";

router.post("/", createPost);
router.get("/", getPosts);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/:id", getPostById);

export default router;
