import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api/reports";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getGeneralStats = async () => {
  const response = await axios.get(`${API_URL}/stats`, getAuthHeader());
  return response.data.data;
};

export const getRevenueData = async () => {
  const response = await axios.get(`${API_URL}/revenue`, getAuthHeader());
  return response.data.data;
};

export const getOrderStatusDistribution = async () => {
  const response = await axios.get(`${API_URL}/status-distribution`, getAuthHeader());
  return response.data.data;
};

export const getProductionReport = async () => {
  const response = await axios.get(`${API_URL}/production`, getAuthHeader());
  return response.data.data;
};
