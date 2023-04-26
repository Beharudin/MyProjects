import {
  Create,
  Get,
  GetById,
  Update,
  Delete,
} from "./poem_modal.js";

export function createPoem(req, res) {
  const body = req.body;

  Create(body, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "You have mysql error in your query!",
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
}

export function getPoemById(req, res) {
  const poemId = req.params.id;
  GetById(poemId, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to fetch poem",
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

export function getPoems(req, res) {
  Get((error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to fetch poem",
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
export function updatePoem(req, res) {
  const body = req.body;
  const id = req.params.id;

  Update(body, id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to update poem",
      });
    }

    return res.status(200).json({
      success: 1,
      message: "Poem updated successfully!",
      data: results,
    });
  });
}

export function deletePoem(req, res) {
  const id = req.params.id;
  Delete(id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to delete poem",
      });
    } else if (results == "") {
      return res.status(201).json({
        success: 0,
        message: "No poem with this id",
      });
    } else {
      return res.status(200).json({
        success: 1,
        message: "Poem deleted successfully!",
      });
    }
  });
}
