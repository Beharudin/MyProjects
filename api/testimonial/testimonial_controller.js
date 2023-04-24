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
        message: "failed to fetch testimonial",
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

export function getTestimonials(req, res) {
  Get((error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to fetch testimonial",
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

export function getRandomTestimonials(req, res) {
  GetRandom((error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to fetch testimonial",
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

export function updateTestimonial(req, res) {
  const body = req.body;
  const id = req.params.id;

  Update(body, id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to update testimonial",
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
export function deleteTestimonial(req, res) {
  const id = req.params.id;
  Delete(id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to delete testimonial",
        status: "failed",
      });
    } else if (results == "") {
      return res.status(201).json({
        success: 0,
        message: "no testimonial with this id",
        status: "failed",
      });
    } else {
      return res.status(200).json({
        success: 1,
        message: "Testimonial deleted successfully!",
      });
    }
  });
}
