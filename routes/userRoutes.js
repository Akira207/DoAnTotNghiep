import express from "express";
import User from "../models/User.js";
import { login } from "../controllers/userController.js";

const router = express.Router();

//Get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//Create a new user
router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

//Get a user by ID
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

//Update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }   
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete a user by ID
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.json({ message: "User deleted" });
});

router.post("/login", login);

export default router;