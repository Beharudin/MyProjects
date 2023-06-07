import {
    updateUser,
    login,
    registerUser,
    refreshToken,
    logout,
  } from "./auth_controller.js";
  import express from "express";
const router=express.Router();

router.post('/register', registerUser)
router.post('/update', updateUser)
router.post('/login', login)
router.post('/refresh-token', refreshToken)
router.delete('/logout', logout)



export default router