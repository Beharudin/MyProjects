import {
  createNovel,
  getNovelById,
  getNovels,
  updateNovel,
  deleteNovel,
  getNovelByName,
} from "./novel_controller.js";
import express from "express";
const router = express.Router();
// import { checkToken } from "../../auth/token_validation.js";

router.post("/", createNovel);
router.get("/", getNovels);
router.patch("/:id", updateNovel);
router.delete("/:id", deleteNovel);
router.get("/:id", getNovelById);
router.post("/name", getNovelByName);

export default router;
