import {
  Create,
  Get,
  GetById,
  Update,
  Delete,
  GetByMobile,
  GetByAccount,
} from "./customer_modal.js";

import {Delete as DeleteAddress} from "./../address/address_modal.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createCustomer(req, res) {
  const body = req.body;
  if (body.password) {
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
  }

  GetByMobile(body.mobile, (error, results) => {
    if (!results) {
      GetByAccount(body.account_no, (error, results) => {
        if (!results) {
          Create(body, (error, results) => {
            if (error) {
              console.log(error);
              res.status(500).json({
                success: 0,
                message: "database connection error!",
              });
            }
            res.status(200).json({
              success: 1,
              data: results,
            });
          });
        } else {
          res.status(409).json({
            success: 0,
            message: "Account Number Already Exists",
            status: "failed",
          });
        }
      });
    } else {
      res.status(409).json({
        success: 0,
        message: "user with same mobile already exist",
        status: "failed",
      });
    }
    //
  });
}

export function getCustomerById(req, res) {
  const userId = req.params.id;
  GetById(userId, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "failed to fetch user",
        status: "failed",
      });
    }
    if (!results) {
      return res.status(201).json({
        success: 0,
        message: "record not found!",
        status: "empty",
      });
    }
    const { password, created_at, ...others } = results;
    res.status(200).json({
      success: 1,
      data: others,
    });
  });
}
export function getCustomerByAccount(req, res) {
  const account_no = req.params.account_no;
  GetByAccount(account_no, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "failed to fetch user",
        status: "failed",
      });
    }
    if (!results) {
      return res.status(201).json({
        success: 0,
        message: "record not found!",
        status: "empty",
      });
    }
    const { password, created_at, ...others } = results;
    res.status(200).json({
      success: 1,
      data: others,
    });
  });
}
export function getCustomers(req, res) {
  Get((error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "failed to fetch user",
        status: "failed",
      });
    } else if (!results) {
      res.status(201).json({
        success: 0,
        message: "record not found!",
        status: "empty",
      });
    } else {
      const { password, created_at, ...others } = results;
      res.status(200).json({
        success: 1,
        data: others,
      });
    }
  });
}
export function updateCustomer(req, res) {
  const body = req.body;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(body.password, salt);
  Update(body, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "failed to update user",
        status: "failed",
      });
    }
    const { password, ...others } = results;
    res.status(200).json({
      success: 1,
      message: "user updated successfully!",
      data: results,
    });
  });
}
export function deleteCustomer(req, res) {
  const id = req.params.id;
  Delete(id, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "failed to delete user. server error",
        status: "failed",
      });
    } else if (!results) {
      res.status(404).json({
        success: 0,
        message: "no user found with the specified id",
        status: "failed",
      });
  
    } else {
    
      // delete associated address

      DeleteAddress(id,(error,results)=>{
        if(error){
           res.status(500).json({
          success: 0,
          message: "failed to delete user. server error",
          status: "failed",
          });
        }else{
          res.status(200).json({
            success: 1,
            message: "user and associated address deleted successfully!",
          });
        }
      })
    }
  });
}
export function login(req, res) {
  GetByMobile(req.body.mobile, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "mysql error please check your query",
        status: "failed",
      });
    }
    if (!results) {
      return res.status(201).json({
        success: 0,
        message: "no data associated with this mobile number!",
      });
    }

    const result = bcrypt.compareSync(req.body.password, results.password);
    // console.log(results[0].user_password);
    if (result) {
      results.password = undefined;
      const jt = jwt.sign({ result: results }, process.env.JWT_KEY, {
        expiresIn: "1d",
      });
      return res.json({
        success: 1,
        message: "customer login Successful!",
        token: jt,
      });
    } else {
      return res.json({
        success: 0,
        data: "invalid username or password",
      });
    }
  });
}
