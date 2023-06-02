import {
  updateUser,
  login,
} from "./user_controller.js";
import express from "express";
const router = express.Router();


router.patch("/:id",updateUser);
router.post("/login", login);
export default router;
