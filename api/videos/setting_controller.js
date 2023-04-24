import { Create, Get, Update } from "./setting_modal.js";

export function createSetting(req, res) {
  const body = req.body;

  Create(body, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "database connection error!",
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
}

export function getSetting(req, res) {
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
export function updateSetting(req, res) {
  const body = req.body;
  Update(body, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to update user",
        status: "failed",
      });
    }
    const { password, ...others } = results;
    return res.status(200).json({
      success: 1,
      message: "Setting updated successfully!",
      data: results,
    });
  });
}
