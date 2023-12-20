import { Update, GetByEmail, UpdatePassword } from "./user_modal.js";
import bcrypt from "bcrypt";
import createError from "http-errors";
import {
  signAccessToken,
  verifyUserToken,
} from "../../middlewares/jwt.controller.js";
import jwt from "jsonwebtoken";

export function updateUser(req, res, next) {
  const body = req.body;

  try {
    if (!body.fullname || !body.email || !body.profile_img || !body.userId)
      throw createError.BadRequest();

    Update(body, body.userId, async (error, result) => {
      if (error) {
        return res.status(error.status ? error.status : 500).json({
          success: 0,
          message:
            error.code === "ER_DUP_ENTRY"
              ? `Email with ${body.email} already exist`
              : error.message
              ? error.message
              : "Failed to update user",
        });
      }
      GetByEmail(body.email, async (error, results) => {
        if (error) {
          return res.status(500).json({
            success: 0,
            message: "MYSQL error please check your query",
          });
        }
        const accessToken = await signAccessToken(results);
        return res.status(200).json({
          success: 1,
          message: "User updated successfully!",
          accessToken,
        });
      })
    });
  } catch (error) {
    next(error);
  }
}

export function updateUserCredentials(req, res, next) {
  const body = req.body;

  try {
    if (!body.password || !body.userId)
      throw createError.BadRequest();
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    UpdatePassword(body, body.userId, async (error, results) => {
      if (error) {
        return res.status(error.status ? error.status : 500).json({
          success: 0,
          message: error.message
              ? error.message
              : "Failed to update password",
        });
      }
      
      return res.status(200).json({
        success: 1,
        message: "Password updated successfully!",
      });
    });
  } catch (error) {
    next(error);
  }
}

export function login(req, res, next) {
  const body = req.body;

  try {
    if (!body.email || !body.password) throw createError.BadRequest();
    GetByEmail(req.body.email, async (error, results) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: "MYSQL error please check your query",
        });
      }
      if (!results) {
        return res.status(201).json({
          success: 0,
          message: "User not found!",
        });
      }

      const match = bcrypt.compareSync(req.body.password, results.password);
      if (match) {
        results.password = undefined;
        const accessToken = await signAccessToken(results);

        return res.status(200).json({
          success: 1,
          message: "Login Successful!",
          accessToken,
        });
      } else {
        return res.status(401).json({
          success: 0,
          message: "Invalid password",
        });
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyToken(req, res, next) {
  try {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());

    const authToken = req.headers["authorization"];
    const accessToken = authToken.split(" ")[1];

    await verifyUserToken(accessToken);

    return res.status(200).json({
      success: 1,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
}
