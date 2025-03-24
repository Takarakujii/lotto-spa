import { useState } from 'react';
import axios from 'axios';

const submitBetForm = () => {
    const [betAmount, setBetAmount] = useState('');
    const [betNumber, setBetNumber] = useState('');

    const handlebet = async () => {
        try {
            const response = await axios.post("http://localhost:8080/v1/bet", {
                betAmount: 50,
                betNumber: betNumber
            }, {
                headers: {
                    apikey: "hotdog",
                    "Content-Type": "application/json",
                    token: localStorage.getItem('token')
                },
                withCredentials: true,
            });

            if (response.data.success) {
              
                handlebet(); 
            } else {
                setError("bet failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during bet", error);
            setError("An error occurred. Please try again.");
        }

};

}