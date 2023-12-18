import {
  getAbout,
  updateAbout,
} from "./about_controller.js";
import express from "express";
const router = express.Router();

router.get("/", getAbout);
router.patch("/", updateAbout);

export default router;
