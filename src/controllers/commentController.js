const commentService = require("../services/commentService.js");

 const addComment = async (req, res, next) => {
  try {
    const issueId = Number(req.params.issueId);
    const { body } = req.body;
    const userId = req.user.id;

    const exists = await commentService.issueExists(issueId);

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    const id = await commentService.createComment(
      issueId,
      userId,
      body
    );

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      commentId: id,
    });
  } catch (err) {
    next(err);
  }
};

 const getComments = async (req, res, next) => {
  try {
    const issueId = Number(req.params.issueId);

    const exists = await commentService.issueExists(issueId);

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    const comments =
      await commentService.getCommentsByIssue(issueId);

    res.json({
      success: true,
      comments,
    });
  } catch (err) {
    next(err);
  }
};

module.exports={addComment,getComments};