import {
  Create,
  Get,
  GetById,
  GetByName,
  Update,
  Delete,
} from "./novel_modal.js";

export function createNovel(req, res) {
  const body = req.body;
  GetByName(body, (error, results) => {
    if (!results) {
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
    } else {
      res.status(409).json({
        success: 0,
        message: "Duplicate novel with same name",
      });
    }
  });
}

export function getNovelById(req, res) {
  const NovelId = req.params.id;
  GetById(NovelId, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to fetch novel",
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


export function getNovels(req, res) {
  Get((error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to fetch novel",
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
export function updateNovel(req, res) {
  const body = req.body;
  const id = req.params.id;

  Update(body, id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to update novel",
      });
    }
    return res.status(200).json({
      success: 1,
      message: "Novel updated successfully!",
      data: results,
    });
  });
}
export function deleteNovel(req, res) {
  const id = req.params.id;
  Delete(id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to delete user",
      });
    } else if (results == "") {
      return res.status(201).json({
        success: 0,
        message: "No novel with this id",
      });
    } else {
      return res.status(200).json({
        success: 1,
        message: "Novel deleted successfully!",
      });
    }
  });
}
