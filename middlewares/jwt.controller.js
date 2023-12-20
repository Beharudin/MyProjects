import jwt from "jsonwebtoken";
import createError from "http-errors";

export const signAccessToken = (data) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId: data.userId,
      email: data.email,
      fullname: data.fullname,
      profile_img: data.profile_img,
    };
    const options = {
      expiresIn: "1h",
    };
    jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, options, (err, token) => {
      if (err) reject(createError.InternalServerError());
      resolve(token);
    });
  });
};

export const verifyAccessToken = (req, res, next) => {
  if (!req.headers["authorization"]) return next(createError.Unauthorized());

  const authToken = req.headers["authorization"];
  const accessToken = authToken.split(" ")[1];

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(createError.Unauthorized(message));
    }
    req.payload = payload;
    next();
  });
};

export async function verifyUserToken(accessToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        reject(createError.Unauthorized(message));
      }

      resolve(payload.email);
    });
  });
}
