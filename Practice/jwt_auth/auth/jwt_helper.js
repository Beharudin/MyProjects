import jwt from "jsonwebtoken";
import createError from "http-errors";

export const signAccessToken = (data) => {
  return new Promise((resolve, reject) => {
    const payload = {
      email: data,
      username: "Beharudin",
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
      console.log(err.name, err.message)
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(createError.Unauthorized(message));
    }
    req.payload = payload;
    next();
  });
};

export const signRefreshToken = (data) => {
  return new Promise((resolve, reject) => {
    const payload = {
      email: data,
      username: "Beharudin",
    };
    const options = {
      expiresIn: "1h",
    };
    jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, options, (err, token) => {
      if (err) reject(createError.InternalServerError());
      resolve(token);
    });
  });
};

export const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {   
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, payload) => {
      if (err) reject(createError.Unauthorized());
      const email=payload.email;
      resolve(email);
    });
  });
};
