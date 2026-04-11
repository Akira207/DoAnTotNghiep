import User from "../models/User.js";
import bcrypt from "bcryptjs";

// CREATE USER
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
    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      password: hashedPassword,
      role,
      phone,
    });
    const saved = await user.save();
    // không trả password
    const { password: _, ...userData } = saved._doc;
    res.status(201).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER BY ID
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

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const { username, role, phone, password } = req.body;
    let updateData = { username, role, phone };
    // nếu có update password thì hash lại
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }
    const updated = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("-password");
    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE USER
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
// LOGIN
// export const login = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     if (password !== user.password) {
//       return res.status(400).json({ message: "Wrong password" });
//     }
//     res.json({
//       message: "Login success",
//       user: {
//         id: user._id,
//         username: user.username,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
