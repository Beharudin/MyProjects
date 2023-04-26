import {
  Create,
  Get,
  GetById,
  Update,
  Delete,
} from "./post_modal.js";

export function createPost(req, res) {
  const body = req.body;
  GetByName(body.name, (error, results) => {
    if (!results) {
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
    } else {
      res.status(409).json({
        success: 0,
        message: "Duplicate posts with same name",
      });
    }
  });
}

export function getPostById(req, res) {
  const postId = req.params.id;
  GetById(postId, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to fetch post",
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


export function getPosts(req, res) {
  Get((error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to fetch post",
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
export function updatePost(req, res) {
  const body = req.body;
  const id = req.params.id;

  Update(body, id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to update post",
      });
    }
    const { password, ...others } = results;
    return res.status(200).json({
      success: 1,
      message: "Post updated successfully!",
      data: results,
    });
  });
}

export function deletePost(req, res) {
  const id = req.params.id;
  Delete(id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Failed to delete post",
      });
    } else if (results == "") {
      return res.status(201).json({
        success: 0,
        message: "No post with this id",
      });
    } else {
      return res.status(200).json({
        success: 1,
        message: "Post deleted successfully!",
      });
    }
  });
}
