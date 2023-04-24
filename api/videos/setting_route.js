import {
  createSetting,
  getSetting,
  updateSetting,
} from "./setting_controller.js";
import express from "express";
const router = express.Router();
// import { checkToken } from "../../auth/token_validation.js";

router.post("/", createSetting);
router.get("/", getSetting);
router.patch("/", updateSetting);

export default router;
