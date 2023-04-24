import {
  createCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  login,
} from "./customer_controller.js";
import express from "express";
// import { checkToken } from "../../auth/token_validation.js";
const router = express.Router();

router.post("/", createCustomer);
router.get("/", getCustomers);
router.patch("/", updateCustomer);
router.delete("/:id", deleteCustomer);
router.get("/:id", getCustomerById);
router.post("/login", login);

export default router;
