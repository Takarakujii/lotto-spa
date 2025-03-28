
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/v1';

export const fetchPotAmount = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/pot`, {
            headers: {
                apikey: "hotdog",
                token: localStorage.getItem('token')
            },
            withCredentials: true
        });
        
        if (!response.data?.success) {
            throw new Error(response.data?.message || "Failed to fetch pot amount");
        }

        return response.data.potAmount || 0;
    } catch (error) {
        console.error("Error fetching pot:", error);
        throw error;
    }
};