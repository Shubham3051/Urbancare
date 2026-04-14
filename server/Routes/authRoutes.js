import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/user.js"; // Ensure correct path and ".js" extension

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    console.log("Incoming Data:", req.body); // 🔥 DEBUG

    const { name, email, password, role, age, bloodGroup, licenseNumber } = req.body;

    // ✅ Basic validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    // ✅ Role-based validation
if (role === "patient" && (!age || !bloodGroup)) {
  return res.status(400).json({ message: "Age & Blood Group required" });
}

if (role === "doctor" && !licenseNumber) {
  return res.status(400).json({ message: "License number required" });
}

    // ✅ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      age: age || null,
      bloodGroup: bloodGroup || null,
      licenseNumber: licenseNumber || null,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("🔥 Signup Error:", err); // ✅ MUST ADD
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Signin Route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
console.log(token);

    res.json({ message: "Sign in successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export default router; // ✅ Fix: Default Export
