const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      default: "Admin",
    },

    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);