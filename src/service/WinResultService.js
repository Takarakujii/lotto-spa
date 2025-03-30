import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/v1';


export const fetchWinResult = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/win-result/history`, {
            headers: {
                apikey: "hotdog"
            },
            withCredentials: true
        });

        if (!response.data?.success){
            console.log("haha", response.data);
            throw new Error(response.data?.message);
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching win result:", error);
        throw error;
    }

};