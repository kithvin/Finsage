import { sendFeedbackEmail } from "../services/emailService.js";

export const submitFeedback = async (req, res, next) => {
  try {
    const { name, role, comment } = req.body;

    if (!name?.trim() || !role?.trim() || !comment?.trim()) {
      return res.status(400).json({
        status: "fail",
        message: "Name, role, and comment are required.",
      });
    }

    // Optional: basic length protection
    if (name.length > 60 || role.length > 80 || comment.length > 500) {
      return res.status(400).json({
        status: "fail",
        message: "Input is too long.",
      });
    }

    await sendFeedbackEmail({
      name: name.trim(),
      role: role.trim(),
      comment: comment.trim(),
    });

    return res.status(200).json({
      status: "success",
      message: "Feedback sent to admin successfully.",
    });
  } catch (err) {
    next(err);
  }
};
