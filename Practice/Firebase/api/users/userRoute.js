import { createUser, deleteUser, getUserById, getUsers, updateUser } from "./userController.js";
import express from "express";
const router = express.Router();
// import { checkToken } from "../../auth/token_validation.js";

router.get("/", getUsers);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);

export default router;
