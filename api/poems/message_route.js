import {
  createMessage,
  getMessageById,
  getMessages,
  updateMessage,
  deleteMessage,
  getMessageByEmail,
  getMessageByStatus,
  updateMessageStatus,
} from "./message_controller.js";
import express from "express";
const router = express.Router();
// import { checkToken } from "../../auth/token_validation.js";

router.post("/", createMessage);
router.get("/", getMessages);
router.patch("/:id", updateMessage);
router.delete("/:id", deleteMessage);
router.get("/:id", getMessageById);
router.get("/email/:email", getMessageByEmail);
router.get("/status/:status", getMessageByStatus);
router.patch("/status/:email", updateMessageStatus);

export default router;
