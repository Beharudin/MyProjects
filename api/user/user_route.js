import {
  updateUser,
  login,
  verifyToken,
  updateUserCredentials,
} from "./user_controller.js";
import express from "express";
const router = express.Router();

router.patch("/update",updateUser);
router.patch("/updatePwd",updateUserCredentials);
// router.get("/:id", getUserById);
router.post("/login", login);
router.get('/verify-token', verifyToken)
export default router;
