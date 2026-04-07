import User from "../models/User.js";


// 🟢 CREATE USER
export const createUser = async (req, res) => {
  try {
    const { username, password, role, phone } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existUser = await User.findOne({ username });
    if (existUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = new User({
      username,
      password,
      role,
      phone
    });

    const saved = await user.save();
    res.status(201).json(saved);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔵 GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // ẩn password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🟡 GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🟠 UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const { username, role, phone } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { username, role, phone }, // chỉ cho sửa các field này
      { new: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔴 DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔐 LOGIN
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({
      message: "Login success",
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};