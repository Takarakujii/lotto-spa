import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';


export default function useCountdown() {
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState(null);
    const [countdown, setCountdown] = useState(60); 

    useEffect(() => {
        const newSocket = io("http://localhost:3000"); 
        setSocket(newSocket);

        newSocket.on("connect", () => {
            setIsConnected(true);
            console.log("✅ WebSocket Connected:", newSocket.id);
        });

        newSocket.on("disconnect", () => {
            setIsConnected(false);
            console.log("❌ WebSocket Disconnected");
        });

        // ✅ Listen for countdown updates
        newSocket.on("countdown", (newCountdown) => {
            
            setCountdown(newCountdown);
            if (newCountdown === 0) {
                setTimeout(() => {
                    setCountdown(60); 
                }, 3000); // 3-second delay
            }
        });

        return () => {
            newSocket.off("countdown");
            newSocket.disconnect();
        };
    }, []);

    return { socket, isConnected, countdown };
}