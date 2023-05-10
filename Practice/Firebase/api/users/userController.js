import { Create, Delete, Get, GetById, Update } from "./userModal.js";

export function getUsers(req, res) {
  Get((error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to fetch users",
        status: "Failed",
        error: error,
      });
    }
    if (!results) {
      return res.status(404).json({
        success: 0,
        message: "Record not found!",
        status: "Empty",
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
}

export function createUser(req, res) {
  const body = req.body;
  Create(body, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: error.message,
      });
    }
    return res.status(200).json({
      success: 1,
      message: results.message
    });
  });
}

export function getUserById(req, res) {
  const UserId = req.params.id;
  GetById(UserId, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to fetch User",
      });
    }
    if (!results) {
      return res.status(404).json({
        success: 0,
        message: "Record not found!",
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
}

export function updateUser(req, res) {
  const body = req.body;
  const id = req.params.id;
  Update(body, id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to update user",
      });
    }
    return res.status(200).json({
      success: 1,
      message: results.message
    });
  });
}

export function deleteUser(req, res) {
  const id = req.params.id;
  Delete(id, (error, results) => {
    console.log(results)
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to delete user",
      });
    } else if (results == "") {
      return res.status(201).json({
        success: 0,
        message: "No user with this id",
      });
    } else {
      return res.status(200).json({
        success: 1,
        message: results.message
      });
    }
  });
}
