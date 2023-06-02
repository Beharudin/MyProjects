import dotenv from "dotenv";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
dotenv.config();

app.use(cors());
// import each routers
import userRouter from "./api/user/user_route.js";
import verifyToken from "./auth/controllers/verifyToken.controller.js";
import errHandler from "./auth/middlewares/errHandler.middleware.js";


// get  router
app.use("/api/user/", userRouter);
app.post("/api/v1/verifyToken", verifyToken, errHandler);

const port = 3001;
app.listen(port, () => {
  console.log("SERVER RUNNING ON PORT " + port);
});
