import {
  Create,
  Get,
  GetById,
  GetByName,
  GetByStatus,
  Update,
  Delete,
} from "./service_modal.js";

export function createService(req, res) {
  const body = req.body;
  GetByName(body.name, (error, results) => {
    if (!results) {
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
    } else {
      res.status(409).json({
        success: 0,
        message: "Duplicate Service with same name",
        status: "Failed",
      });
    }
  });
}

export function getServiceById(req, res) {
  const serviceId = req.params.id;
  GetById(serviceId, (error, results) => {
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

export function getServiceByName(req, res) {
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

export function getServiceByStatus(req, res) {
  GetByStatus(req.body.status, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to fetch service",
        status: "failed",
      });
    }
    if (!results) {
      return res.status(404).json({
        success: 0,
        message: "record not found with this status!",
        status: "empty",
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
}

export function getServices(req, res) {
  Get((error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to fetch service",
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
export function updateService(req, res) {
  const body = req.body;
  const id = req.params.id;

  Update(body, id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to update service",
        status: "failed",
      });
    }
    const { password, ...others } = results;
    return res.status(200).json({
      success: 1,
      message: "Service updated successfully!",
      data: results,
    });
  });
}

export function deleteService(req, res) {
  const id = req.params.id;
  Delete(id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to delete service",
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
        message: "service deleted successfully!",
      });
    }
  });
}
