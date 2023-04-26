import {
  Create,
  Get,
  GetById,
  GetRandom,
  Update,
  Delete,
} from "./testimonial_modal.js";

export function createTestimonial(req, res) {
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

export function getTestimonialById(req, res) {
  const id = req.params.id;
  GetById(id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to fetch testimonial",
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

export function getTestimonials(req, res) {
  Get((error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to fetch testimonial",
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

export function getRandomTestimonials(req, res) {
  GetRandom((error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to fetch testimonial",
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

export function updateTestimonial(req, res) {
  const body = req.body;
  const id = req.params.id;

  Update(body, id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to update testimonial",
      });
    }
    return res.status(200).json({
      success: 1,
      message: "Testimonial updated successfully!",
      data: results,
    });
  });
}
export function deleteTestimonial(req, res) {
  const id = req.params.id;
  Delete(id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to delete testimonial",
      });
    } else if (results == "") {
      return res.status(201).json({
        success: 0,
        message: "No testimonial with this id",
      });
    } else {
      return res.status(200).json({
        success: 1,
        message: "Testimonial deleted successfully!",
      });
    }
  });
}
