const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireRole = require('../middleware/requireRole');
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");
const uploadController = require("../controllers/uploadController");
const upload = require("../middleware/upload");
const path = require("path");

// Register

router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

router.get("/profile", authMiddleware, authController.profile);

router.put("/update-profile", authMiddleware, upload.single('avatar'), authController.updateProfile);
module.exports = router;
