import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    let { token } = req.query;
    let { middleware } = req.query;
    if (!token) {
      throw {
        status: 400,
        msg: "missing field in request (authentication token)",
      };
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        throw {
          status: 401,
          msg: "Unauthorized!",
        };
      }
      req.decoded = decoded;
      if (!middleware) {
        res.status(200).send({
          userData: req.decoded,
          accessToken: token,
        });
      } else {
        req.decoded = {}
        req.decoded.userData = decoded;
        next();
      }
    });
  } catch (err) {
    next(err);
  }
};

export default verifyToken;
