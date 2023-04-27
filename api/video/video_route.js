import {
  createVideo,
  getVideo,
  updateVideo,
  deleteVideo
} from "./video_controller.js";
import express from "express";
const router = express.Router();
// import { checkToken } from "../../auth/token_validation.js";

router.post("/", createVideo);
router.get("/", getVideo);
router.delete("/:id", deleteVideo);
router.patch("/:id", updateVideo);

export default router;
