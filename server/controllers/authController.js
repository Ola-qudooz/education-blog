const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// CREATE ADMIN
exports.createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (err) {
    console.error("========== CREATE ADMIN ERROR ==========");
    console.error(err);
    console.error(err.stack);

    res.status(500).json({
      message: err.message,
    });
  }
};

// LOGIN ADMIN
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Login attempt:", username);

    const admin = await Admin.findOne({ username });

    if (!admin) {
      console.log("Admin not found");
      return res.status(400).json({
        message: "Invalid username",
      });
    }

    console.log("Admin found");

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      console.log("Password incorrect");
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    console.log("Password correct");

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    console.log("Login successful");

    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (err) {
    console.error("========== LOGIN ERROR ==========");
    console.error(err);
    console.error(err.stack);

    res.status(500).json({
      message: err.message,
    });
  }
};