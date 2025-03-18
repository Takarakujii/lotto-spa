import axios from 'axios';

const API_URL = "http://localhost:8080/v1/";
const API_KEY = "hotdog";

export const addMoney = async (money) => {
    try {
        const payload = { amount: money };
        const response = await axios.post(`${API_URL}topup`, payload, {
            headers: {
                apikey: API_KEY,
                token: localStorage.getItem('jwttoken') // Retrieve token from local storage
            }
        });
        return response;
    } catch (err) {
        throw new Error(err.response?.data.message || "Topup failed");
    }
};