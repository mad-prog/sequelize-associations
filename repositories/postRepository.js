const Post = require("../models/Post");
const User = require("../models/User");

exports.findAllPosts = async () => {
  return await Post.findAll({ include: User });
};

exports.findPostById = async (id) => {
  return await Post.findByPk(id, {
    include: { model: User, attributes: ["name"] },
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
  //const destroyedRow = await Post.destroy({ where: { id } });
  //destroyedRow ? res.sendStatus(204) : res.sendStatus();
};
