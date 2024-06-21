import express from "express";
import { generateToken, jwtAuthMiddleware } from "../helpers/jwt.js";
import User from "../models/user.model.js";

// router initiate from express
const router = express.Router();

// SIGNUP USER ROUTE
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    const payload = {
      id: response.id,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("token is", token);

    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// LOGIN USER ROUTE
router.post("/login", async (req, res) => {
  try {
    const { nidCardNumber, password } = req.body;
    const user = await User.findOne({ nidCardNumber: nidCardNumber });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username and password" });
    }
    const payload = {
      id: response.id,
    };
    const token = generateToken(payload);
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// USER PROFILE ROUTE
router.get("/profile", async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// USER PROFILE PASSWORD UPDATE
router.put("/profile/password", jwtAuthMiddleware async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById({ userId });
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid username and password" });
    }

    user.password = newPassword
    await user.save()
    console.log("password updated")
    res.status(200).json({message:"password updated"})

  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal server error");
  }
});

export default router
