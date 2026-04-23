import axios from "axios";

const API = "http://localhost:5000/api/auth";

// ✅ Helper to extract data from API response
const getResponseData = (response) => response.data || response;

// LOGIN
export const login = async (credentials) => {
  const res = await axios.post(`${API}/login`, credentials);
  const data = getResponseData(res);
  
  // Save token to localStorage
  if (data.data?.token) {
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("user", JSON.stringify(data.data.user));
  }
  
  return data.data || data;
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// GET CURRENT USER
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// GET TOKEN
export const getToken = () => {
  return localStorage.getItem("token");
};

// Export as object for use in interceptor
export const authService = {
  login,
  logout,
  getCurrentUser,
  getToken,
};