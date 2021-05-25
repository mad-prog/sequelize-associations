const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

exports.findAllPosts = async () => {
  return await Post.findAll({
    include: {
      model: User,
      attributes: ["name"],
    },
  });
};

exports.findPostById = async (id) => {
  return await Post.findByPk(id, {
    include: [
      { model: User, attributes: ["name"] },
      {
        model: Comment,
        attributes: ["content"],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
    ],
  });
};

exports.insertPost = async (post) => {
  return await Post.create(post);
};

exports.updatePost = async (id, postDetails) => {
  return await Post.update(postDetails, { where: { id } });
};

exports.deletePost = async (id) => {
  return await Post.destroy({ where: { id } });
};
