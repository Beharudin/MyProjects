import {
  Get,
  Update,
} from "./website_modal.js";

export function getWebsite(req, res) {
  Get((error, results) => {
    if (error) {
      res.status(500).json({
        success: 0,
        message: "Failed to fetch website",
      });
    } else if (!results) {
      res.status(201).json({
        success: 0,
        message: "Record not found!",
      });
    } else {
      res.status(200).json({
        success: 1,
        data: results,
      });
    }
  });
}
export function updateWebsite(req, res) {
  const body = req.body;
  const id=req.params.id;

  Update(id, body, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "Failed to update website",
      });
    }
    res.status(200).json({
      success: 1,
      message: "Website updated successfully!",
      data: results,
    });
  });
}
