import { Create, Get, GetById, Update } from "./about_modal.js";

export function createAbout(req, res) {
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
      data: results,
    });
  });
}

export function getAboutById(req, res) {
  const featureId = req.params.id;

  if (!results) {
    return res.status(404).json({
      success: 0,
      message: "record not found!",
      status: "empty",
    });
  }
  return res.status(200).json({
    success: 1,
    data: results,
  });
}

export function getAbout(req, res) {
  Get((error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to fetch user",
        status: "failed",
      });
    }
    if (!results) {
      return res.status(404).json({
        success: 0,
        message: "record not found!",
        status: "empty",
      });
    }

    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
}
export function updateAbout(req, res) {
  const body = req.body;

  Update(body, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to update about",
        status: "failed",
      });
    }
    return res.status(200).json({
      success: 1,
      message: "About updated successfully!",
      data: results,
    });
  });
}
