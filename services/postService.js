const postRepository = require("../repositories/postRepository");
// const { checkout } = require("../routes/posts");
const checkOwnership = require("../utils/checkOwnership");
const { updatePostSchema } = require("../validations/postValidation");

const HttpError = require("../utils/httpError");

exports.getPost = async (id) => {
  const post = await postRepository.findPostById(id);
  return post.toJSON();
};

exports.getAllPosts = async () => {
  return await postRepository.findAllPosts();
};

exports.createPost = async (post) => {
  if (!post.title || !post.content) {
    throw new HttpError(
      400,
      "You must provide title and content in order to create a post"
    );
  }
  await postRepository.insertPost(post);
};

exports.editPost = async (user, postId, postDetails) => {
  const post = await postRepository.findPostById(postId);

  if (!checkOwnership(post, user)) throw new HttpError(401);

  const validationData = await updatePostSchema.validateAsync(postDetails);

  await postRepository.updatePost(postId, validationData);
};

exports.deletePost = async (id) => {
  await postRepository.deletePost(id);
};
