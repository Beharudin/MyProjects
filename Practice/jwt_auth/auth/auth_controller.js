import { Update, GetByEmail, Create } from "./auth_modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "./jwt_helper.js";

export function registerUser(req, res, next) {
  const body = req.body;
  const salt = bcrypt.genSaltSync(10);
  try {
    if (!body.username || !body.email || !body.password)
      throw createError.BadRequest();
    body.password = bcrypt.hashSync(body.password, salt);
    Create(body, async (error, results) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message:
            error.code === "ER_DUP_ENTRY"
              ? `Email with ${body.email} already exist`
              : error.sqlMessage,
        });
      }
      const accessToken = await signAccessToken(body.email);
      const refreshToken = await signAccessToken(body.email);

      return res.status(200).json({
        success: 1,
        accessToken,
        refreshToken,
      });
    });
  } catch (error) {
    next(error);
  }
}

export function updateUser(req, res, next) {
  // const body = req.body;
  // const id = req.params.id;

  try {
    if (!body.username || !body.email || !body.password)
      throw createError.BadRequest();
    //   const salt = bcrypt.genSaltSync(10);
    //   body.password = bcrypt.hashSync(body.password, salt);

    // Update(body, id, (error, results) => {
    //   if (error) {
    //     return res.status(500).json({
    //       success: 0,
    //       message: "Failed to update user",
    //       status: "Failed",
    //     });
    //   }
    //   const { password, ...others } = results;
    //   return res.status(200).json({
    //     success: 1,
    //     message: "User updated successfully!",
    //     data: results,
    //   });
    // });
    res.send("Update user route");
  } catch (error) {
    next(error);
  }
}

export async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if(!refreshToken) return next(createError.BadRequest())
    const email=await verifyRefreshToken(refreshToken);
    
    const accessToken =await signAccessToken(email);
    const myrefreshToken = await signRefreshToken(email);

    res.send({accessToken, refreshToken: myrefreshToken});
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
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: "MYSQL error please check your query",
          status: "Failed",
        });
      }
      if (!results) {
        return res.status(201).json({
          success: 0,
          message: "User not found!",
        });
      }

      const result = bcrypt.compareSync(req.body.password, results.password);

      if (result) {
        results.password = undefined;
        const accessToken = await signAccessToken(body.email);
        const refreshToken = await signAccessToken(body.email);

        return res.json({
          success: 1,
          message: "Login Successful!",
          accessToken,
          refreshToken,
        });
      } else {
        return res.json({
          success: 0,
          message: "Invalid password",
        });
      }
    });
  } catch (error) {
    next(error);
  }
}

export function logout(req, res, next) {
  try {
    res.send("Logout route");
  } catch (error) {
    next(error);
  }
}
