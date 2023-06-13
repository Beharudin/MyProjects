import {
    updateUser,
    login,
    registerUser,
    refreshToken,
  } from "./auth.controller.js";
  import express from "express";
const router=express.Router();

router.post('/register', registerUser)
router.post('/update', updateUser)
router.post('/login', login)
router.post('/refresh-token', refreshToken)



export default router