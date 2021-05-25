const commentRepository = require("../repositories/commentRepository");

exports.createComment = async (comment) => {
  if (!comment.content) {
    throw new Error("You must provide content to create a comment");
  }
  await commentRepository.insertComment(comment);
};

exports.getAllComments = async () => {
  return await commentRepository.findAllComments();
};

exports.deleteComment = async (id) => {
  await commentRepository.deleteComment(id);
};
