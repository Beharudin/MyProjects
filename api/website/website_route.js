import {
  getWebsite,
  updateWebsite,
} from "./website_controller.js";
import express from "express";
// import { checkToken } from "../../auth/token_validation.js";
const router = express.Router();

router.get("/", getWebsite);
router.patch("/:id", updateWebsite);

export default router;
