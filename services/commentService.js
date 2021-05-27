const commentRepository = require("../repositories/commentRepository");
const HttpError = require("../utils/httpError");

exports.createComment = async (user, comment) => {
  if (!comment.content) {
    throw new HttpError(400);
  }
  //assigns user id from token req.user
  comment.UserId = user.id;
  await commentRepository.insertComment(comment);
};

exports.getAllComments = async () => {
  return await commentRepository.findAllComments();
};

exports.deleteComment = async (user, commentId) => {
  const comment = commentRepository.findCommentById(commentId);

  if (!checkOwnership(comment, user)) {
    throw new HttpError(
      401,
      "You don't have permission to delete this comment"
    );
  }
  await commentRepository.deleteComment(commentId);
};

exports.deleteAllComments = async (PostId) => {
  await commentRepository.deleteAllComments(PostId);
};
