import jwt from "jsonwebtoken";
import { unauthorized, badRequest } from "../utils/apiResponse.js";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return unauthorized(res, "Not authorized");
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return unauthorized(res, "Token invalid");
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return unauthorized(res, "User role not found");
    }
    if (!roles.includes(req.user.role)) {
      return badRequest(res, `Role ${req.user.role} is not authorized to perform this action`);
    }
    next();
  };
};
