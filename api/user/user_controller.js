import {
  Update,
  GetByEmail,
} from "./user_modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function updateUser(req, res) {
  const body = req.body;
  const id = req.params.id;
  
  if (body.password) {
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
  }

  Update(body, id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to update user",
        status: "Failed",
      });
    }
    const { password, ...others } = results;
    return res.status(200).json({
      success: 1,
      message: "User updated successfully!",
      data: results,
    });
  });
}


export function login(req, res) {
  GetByEmail(req.body.email, (error, results) => {
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
        message: "No data associated with this email address!",
      });
    }
    
const result = bcrypt.compareSync(req.body.password, results.password);
    
    if (result) {
      results.password = undefined;
      const jt = jwt.sign({ result: results }, process.env.JWT_KEY, {
        expiresIn: "1h",
      });
      return res.json({
        success: 1,
        message: "Login Successful!",
        data:results,
        token: jt,
      });
    } else {
      return res.json({
        success: 0,
        message: "Invalid username or password",
      });
    }
  });
}
