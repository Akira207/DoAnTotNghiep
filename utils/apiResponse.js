/**
 * API Response Handler
 * Chuẩn hóa tất cả responses
 */

class ApiResponse {
  constructor(statusCode, data, message) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

// ✅ SUCCESS RESPONSE
export const successResponse = (res, data, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json(
    new ApiResponse(statusCode, data, message)
  );
};

// ✅ CREATED RESPONSE
export const createdResponse = (res, data, message = "Created successfully") => {
  return res.status(201).json(
    new ApiResponse(201, data, message)
  );
};

// ❌ ERROR RESPONSE
export const errorResponse = (res, statusCode = 500, message = "Internal server error", data = null) => {
  return res.status(statusCode).json(
    new ApiResponse(statusCode, data, message)
  );
};

// ❌ BAD REQUEST
export const badRequest = (res, message = "Bad request") => {
  return errorResponse(res, 400, message);
};

// ❌ NOT FOUND
export const notFound = (res, message = "Not found") => {
  return errorResponse(res, 404, message);
};

// ❌ UNAUTHORIZED
export const unauthorized = (res, message = "Unauthorized") => {
  return errorResponse(res, 401, message);
};

// ❌ FORBIDDEN
export const forbidden = (res, message = "Forbidden") => {
  return errorResponse(res, 403, message);
};

export default ApiResponse;
