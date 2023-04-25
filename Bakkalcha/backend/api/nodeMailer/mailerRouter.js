import express from "express";
const router = express.Router();

import { NodeMailer } from "./mailerController.js";

router.post("/", NodeMailer);

export default router;
