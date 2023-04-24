import {
  createAbout,
  getAboutById,
  getAbout,
  updateAbout,
} from "./about_controller.js";
import express from "express";
const router = express.Router();
// import { checkToken } from "../../auth/token_validation.js";

router.post("/", createAbout);
router.get("/", getAbout);
router.patch("/", updateAbout);
router.get("/:id", getAboutById);

export default router;
