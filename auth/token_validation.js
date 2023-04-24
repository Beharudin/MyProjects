import jwt from "jsonwebtoken";

export function checkToken(req, res, next) {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        res.status(400).json({
          success: 0,
          message: "invalid token passed!",
        });
      } else {
        res.status(200).json({success:1, message:"validated"})
        // next();
      }
    });
  } else {
    res.status(400).json({
      success: 0,
      message: "access denied! no token passed !",
    });
  }
}
