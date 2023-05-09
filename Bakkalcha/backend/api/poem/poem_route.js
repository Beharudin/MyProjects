import {
  createPoem,
  getPoemById,
  getPoems,
  updatePoem,
  deletePoem,
} from "./poem_controller.js";
import express from "express";
const router = express.Router();
// import { checkToken } from "../../auth/token_validation.js";

router.post("/", createPoem);
router.get("/", getPoems);
router.patch("/:id", updatePoem);
router.delete("/:id", deletePoem);
router.get("/:id", getPoemById);

export default router;
