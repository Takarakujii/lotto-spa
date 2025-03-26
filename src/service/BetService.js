import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/v1";

export const placeBet = async (betNumber) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bet`, {
      betAmount: "50",
      betNumber: betNumber
    }, {
      headers: {
        apikey: "hotdog",
        "Content-Type": "application/json",
        token: localStorage.getItem('token')
      },
      withCredentials: true
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Bet failed");
    }

    return response.data;
  } catch (error) {
    console.error("Bet error:", error);
    throw error;
  }
};