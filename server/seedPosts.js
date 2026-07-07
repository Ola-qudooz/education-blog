const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Post = require("./models/Post");

dotenv.config();

const posts = [
  {
    title: "Nigeria Education Reform: What Students Should Expect in 2026",
    category: "Education",
    content:
      "The Nigerian government has announced new reforms aimed at improving university learning systems, digital access, and student funding structures...",
    image: "",
    slug: "education-reform-2026",
  },
  {
    title: "Lagos Tech Ecosystem Continues Rapid Growth",
    category: "Tech",
    content:
      "Startups in Lagos are attracting more foreign investment as fintech, AI, and logistics platforms expand across West Africa...",
    image: "",
    slug: "lagos-tech-growth",
  },
  {
    title: "Fuel Price Adjustments and Economic Impact on Citizens",
    category: "Economy",
    content:
      "Recent changes in fuel pricing have affected transportation costs, food prices, and student living expenses across Nigeria...",
    image: "",
    slug: "fuel-price-impact",
  },
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Post.deleteMany();
    await Post.insertMany(posts);

    console.log("🌱 Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
}

seedDB();