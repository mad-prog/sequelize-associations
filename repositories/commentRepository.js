const Comment = require("../models/Comment");

const User = require("../models/User");

exports.insertComment = async (comment) => {
  return await Comment.create(comment);
};

exports.findAllComments = async () => {
  return await Comment.findAll({
    include: {
      model: User,
      attributes: ["name"],
    },
  });
};

exports.deleteComment = async (id) => {
  return await Comment.destroy({ where: { id } });
};

exports.deleteAllComments = async (PostId) => {
  return await Comment.destroy({ where: { PostId } });
};
