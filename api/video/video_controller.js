import { Create, Get, Update, Delete } from "./video_modal.js";

export function createVideo(req, res) {
  const body = req.body;

  Create(body, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Database connection error!",
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
}

export function getVideo(req, res) {
  Get((error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to fetch video",
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
export function updateVideo(req, res) {
  const body = req.body;
  Update(body, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to update video",
      });
    }
    const { password, ...others } = results;
    return res.status(200).json({
      success: 1,
      message: "Video updated successfully!",
      data: results,
    });
  });
}

export function deleteVideo(req, res) {
  const id = req.params.id;
  Delete(id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to delete video",
      });
    } else if (results == "") {
      return res.status(201).json({
        success: 0,
        message: "No video with this id",
      });
    } else {
      return res.status(200).json({
        success: 1,
        message: "Video deleted successfully!",
      });
    }
  });
}
