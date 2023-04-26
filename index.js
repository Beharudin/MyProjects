import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
// dotenv.config();

// app.use(cors());
// import each routers
// import userRouter from "./api/users/user_router.js";
// import customerRouter from "./api/customer/customer_route.js";
import postRouter from "./api/post/post_route.js";
import videoRouter from "./api/video/video_route.js";
import novelRouter from "./api/novel/novel_route.js";
import aboutRouter from "./api/about/about_route.js";
import poemRouter from "./api/poem/poem_route.js";
// import TestimonialRouter from "./api/testimonial/testimonial_route.js";
// import FAQRouter from "./api/FAQ/faq_route.js";
// import AddressRouter from "./api/address/address_router.js"
// import MailerRouter from "./api/nodeMailer/mailerRouter.js";

// import { checkToken } from "./auth/token_validation.js";


// image route
// app.use("/images", express.static(path.join(__dirname, "/images")));

// app.use(express.static(path.join(__dirname, "./images")));

// perform file upload operation
// const randomFileName = randomstring.generate(7);
// const storage = multer.diskStorage({
//   destination: (res, file, callback) => {
//     callback(file, "./images");
//   },
//   filename: (req, file, callback) => {
//     callback(null, req.body.name);
//   },
// });

// now upload file
// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   res.status(200).json("file has been uploaded");
// });

// app.get("/api/auth/",checkToken);

// get  router
// app.use("/api/users/", userRouter);
// app.use("/api/customers/", customerRouter);
app.use("/api/posts/", postRouter);
app.use("/api/videos/", videoRouter);
app.use("/api/novels/", novelRouter);
app.use("/api/about/", aboutRouter);
app.use("/api/poems/", poemRouter);
// app.use("/api/testimonials/", TestimonialRouter);
// app.use("/api/faq/", FAQRouter);
// app.use("/api/address/", AddressRouter);
// app.use("/api/mailer/", MailerRouter);


const port = 3001;
app.listen(port, () => {
  console.log("SERVER RUNNING ON PORT " + port);
});
