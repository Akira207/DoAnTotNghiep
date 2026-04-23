import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  successResponse,
  badRequest,
  errorResponse,
} from "../utils/apiResponse.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. validate input
    if (!username || !password) {
      return badRequest(res, "Username and password are required");
    }

    // 2. find user
    const user = await User.findOne({ username });
    if (!user) {
      return badRequest(res, "User not found");
    }

    // 3. check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return badRequest(res, "Wrong password");
    }

    // 4. check JWT secret
    if (!process.env.JWT_SECRET) {
      return errorResponse(res, 500, "JWT_SECRET is not defined in environment");
    }

    // 5. create token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6. response
    return successResponse(res, {
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    }, "Login successful");
  } catch (error) {
    return errorResponse(res, 500, "Login error");
  }
};