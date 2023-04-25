import {
  getAbout,
  updateAbout,
} from "./about_controller.js";
import express from "express";
const router = express.Router();
// import { checkToken } from "../../auth/token_validation.js";

router.get("/", getAbout);
router.patch("/", updateAbout);

export default router;
