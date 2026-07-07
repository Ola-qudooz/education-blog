const Post = require("../models/Post");
const { v4: uuidv4 } = require("uuid");

// CREATE POST
exports.createPost = async (req, res) => {
  try {
    const { title, category, content } = req.body;

    const image = req.files ? req.files.image : null;

    let imagePath = "";

    if (image) {
      const fileName = `${uuidv4()}_${image.name}`;
      image.mv(`./uploads/${fileName}`);
      imagePath = fileName;
    }

    const post = await Post.create({
      title,
      category,
      content,
      image: imagePath,
      slug: title.toLowerCase().split(" ").join("-") + "-" + Date.now(),
    });

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL POSTS
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE POST
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE POST
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.title = req.body.title;
    post.category = req.body.category;
    post.content = req.body.content;

    if (req.files && req.files.image) {
      const image = req.files.image;
      const fileName = `${uuidv4()}_${image.name}`;

      await image.mv(`./uploads/${fileName}`);

      post.image = fileName;
    }

    await post.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE POST
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LIKE POST
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    post.likes += 1;

    await post.save();

    res.json({
      likes: post.likes,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};