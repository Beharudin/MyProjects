import dotenv from "dotenv";
import express from "express";
import createError from "http-errors";
import cors from "cors";
import { verifyAccessToken } from "./auth/jwt_helper.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

import authRouter from "./auth/auth_route.js";

app.get("/", verifyAccessToken, async (req, res, next) => {
  res.send("Hello from index page");
});

app.use("/auth", authRouter);

app.use(async (req, res, next) => {
  next(createError.NotFound("This route is not found!"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status,
    message: err.message,
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
