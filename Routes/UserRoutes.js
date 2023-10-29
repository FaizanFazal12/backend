const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { SetUser,getUser } = require("../services");
const User = require("../models/User"); // Assuming this is the path to your User model

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if the email is already taken
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by username
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    //save cookie

    const token = SetUser(user);

    res.cookie("token", token, { httpOnly: true });
    return res.json({user , success:true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//auto_login 

router.get("/auto-login", async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    // Use GetUser to verify and retrieve user from token
    const user = getUser(token);

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    return res.json({ user, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/logout", async (req, res) => {
  try {
    res.clearCookie("token"); // Clear the token cookie
    return res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}); 

module.exports = router;
