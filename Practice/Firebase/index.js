import express from "express";

const app = express();
app.use(express.json());

import usersRouter from "./api/users/userRoute.js";

app.use("/api/users/", usersRouter);


const port = 3001;
app.listen(port, () => {
  console.log("SERVER RUNNING ON PORT " + port);
})