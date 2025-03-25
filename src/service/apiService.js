import axios from "axios";

const API_BASE_URL = "http://localhost:8080/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    apikey: "hotdog",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor to include token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export const generateNewDraw = async () => {
  try {
    const response = await api.post("/draw/", {});
    return response.data;
  } catch (error) {
    console.error("Error generating new draw:", error);
    throw error;
  }
};

export const fetchLastWinningNumber = async () => {
  try {
    const response = await api.get("/draw/last");
    return response.data;
  } catch (error) {
    console.error("Error fetching last draw:", error);
    throw error;
  }
};

export const placeBet = async (betNumber) => {
  try {
    const response = await api.post("/bet", {
      betAmount: "50",
      betNumber: betNumber,
    });
    return response.data;
  } catch (error) {
    console.error("Error placing bet:", error);
    throw error;
  }
};