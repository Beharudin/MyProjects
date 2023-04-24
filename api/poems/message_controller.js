import {
  Create,
  Get,
  GetById,
  Update,
  Delete,
  GetByEmail,
  UpdateStatus,
  GetByStatus,
} from "./message_modal.js";

export function createMessage(req, res) {
  const body = req.body;

  Create(body, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "you have mysql error in your query!",
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
}

export function getMessageById(req, res) {
  const serviceId = req.params.id;
  GetById(serviceId, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to fetch message",
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

export function getMessageByEmail(req, res) {
  const email = req.params.email;
  GetByEmail(email, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to fetch message",
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

export function getMessageByStatus(req, res) {
  const status = req.params.status;
  GetByStatus(status, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to fetch message",
        status: "failed",
      });
    }
    if (!results) {
      return res.status(404).json({
        success: 0,
        message: "No message found!",
        status: "empty",
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
}

export function getMessages(req, res) {
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
export function updateMessage(req, res) {
  const body = req.body;
  const id = req.params.id;

  Update(body, id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to update messages",
        status: "failed",
      });
    }

    return res.status(200).json({
      success: 1,
      message: "Message updated successfully!",
      data: results,
    });
  });
}

export function updateMessageStatus(req, res) {
  const email = req.params.email;
  UpdateStatus(req.body, email, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to update messages",
        status: "failed",
      });
    }
    return res.status(200).json({
      success: 1,
      message: "Message Status updated successfully!",
      data: results,
    });
  });
}

export function deleteMessage(req, res) {
  const id = req.params.id;
  Delete(id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "failed to delete message",
        status: "failed",
      });
    } else if (results == "") {
      return res.status(201).json({
        success: 0,
        message: "no message with this id",
        status: "failed",
      });
    } else {
      return res.status(200).json({
        success: 1,
        message: "message deleted successfully!",
      });
    }
  });
}
