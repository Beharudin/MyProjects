import {
  createFeature,
  getFeatureById,
  getFeatures,
  updateFeature,
  deleteFeature,
  getFeatureByName,
} from "./feature_controller.js";
import express from "express";
const router = express.Router();
// import { checkToken } from "../../auth/token_validation.js";

router.post("/", createFeature);
router.get("/", getFeatures);
router.patch("/:id", updateFeature);
router.delete("/:id", deleteFeature);
router.get("/:id", getFeatureById);
router.post("/name", getFeatureByName);

export default router;
