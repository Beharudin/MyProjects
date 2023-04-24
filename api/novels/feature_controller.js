import {
  Create,
  Get,
  GetById,
  GetByName,
  Update,
  Delete,
} from "./feature_modal.js";

export function createFeature(req, res) {
  const body = req.body;
  GetByName(body.name, (error, results) => {
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
        message: "Duplicate Feature with same name",
        status: "Failed",
      });
    }
  });
}

export function getFeatureById(req, res) {
  const featureId = req.params.id;
  GetById(featureId, (error, results) => {
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

export function getFeatureByName(req, res) {
  GetByName(req.body.name, (error, results) => {
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
        message: "record not found with this name!",
        status: "empty",
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
}

export function getFeatures(req, res) {
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
export function updateFeature(req, res) {
  const body = req.body;
  const id = req.params.id;

  Update(body, id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to update user",
        status: "failed",
      });
    }
    return res.status(200).json({
      success: 1,
      message: "Feature updated successfully!",
      data: results,
    });
  });
}
export function deleteFeature(req, res) {
  const id = req.params.id;
  Delete(id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to delete user",
        status: "failed",
      });
    } else if (results == "") {
      return res.status(201).json({
        success: 0,
        message: "no user with this id",
        status: "failed",
      });
    } else {
      return res.status(200).json({
        success: 1,
        message: "Feature deleted successfully!",
      });
    }
  });
}
