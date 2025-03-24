import axios from "axios";

const API_BASE_URL = "http://localhost:8080/v1";


export const fetchLastWinningNumber = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/draw/last`, {
      headers: {
        apikey: "hotdog", 
        token: localStorage.getItem("token"), 
      },
    });

    if (response.data && response.data.lastDraw && response.data.lastDraw.winning_number) {
      return response.data.lastDraw.winning_number.split("-").map(Number);
    } else {
      console.error("Unexpected API response structure:", response.data);
      return null;
    }
  } catch (err) {
    console.error("Error fetching last draw:", err);
    throw err; // Re-throw the error for handling in the component
  }
};

// Function to generate a new draw
export const generateNewDraw = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/draw/`,
      {}, 
      {
        headers: {
          apikey: "hotdog", 
          "Content-Type": "application/json",
          token: localStorage.getItem("token"), 
        },
        withCredentials: true,
      }
    );

    if (response.data.success) {
      console.log("New draw generated:", response.data);
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to generate a new draw.");
    }
  } catch (error) {
    console.error("Error generating new draw:", error);
    throw error; 
  }
};