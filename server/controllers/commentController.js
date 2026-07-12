const Comment = require("../models/Comment");

// ADD COMMENT
exports.addComment = async (req, res) => {
  try {
    const { post, name, message } = req.body;

    const newComment = await Comment.create({
      post,
      name,
      message,
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// GET COMMENTS
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    }).sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};