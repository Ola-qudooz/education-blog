const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/postController");

const authMiddleware = require("../middleware/authMiddleware");

// PUBLIC
router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/:id/like", likePost);

// ADMIN
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;