const express = require("express");
const router = express.Router();
const commentService = require("../services/commentService");
const roleValidation = require("../middleware/roleValidation");

router.post("/", roleValidation("user"), async (req, res, next) => {
  try {
    //gets user id from token
    await commentService.createComment(req.user, req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const comments = await commentService.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", roleValidation("user"), async (req, res, next) => {
  try {
    const { id } = req.params;
    await commentService.deleteComment(req.user, id);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/postid/:PostId", async (req, res) => {
  try {
    const { PostId } = req.params;
    await commentService.deleteAllComments(PostId);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
