import { Get, Update } from "./about_modal.js";


export function getAbout(req, res) {
  Get((error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to fetch about",
        status: "failed",
        error:error,
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
