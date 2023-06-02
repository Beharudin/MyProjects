import axios from "axios";
import verifyToken from "../controllers/verifyToken.controller.js";

const validateToken = async (req, res, next) => {
    try {
        let { token } = req.headers;
        if (!token) {
            throw {
                status: 400,
                msg: "missing field in request (auth token)",
            };
        }
        req.query.middleware = true;
        req.query.token = token;
        verifyToken(req, res, next)
    } catch (err) {
        next({ currentTask: 'validating token', err });
    }
};

export default validateToken;
