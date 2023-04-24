import {
  createTestimonial,
  getTestimonialById,
  getTestimonials,
  updateTestimonial,
  deleteTestimonial,
  getRandomTestimonials,
} from "./testimonial_controller.js";
import express from "express";
const router = express.Router();
// import { checkToken } from "../../auth/token_validation.js";

router.post("/", createTestimonial);
router.get("/", getTestimonials);
router.get("/random", getRandomTestimonials);
router.patch("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);
router.get("/:id", getTestimonialById);

export default router;
