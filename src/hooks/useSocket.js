import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

/**
 * @returns {{ socket: Socket | null, isConnected: boolean, countdown: number }}
 */
export default function useSocket() {
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState(null);
    const [countdown, setCountdown] = useState(60); // Default value

    useEffect(() => {
        const newSocket = io("http://localhost:3000"); // Ensure correct server URL
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
            //console.log(`📥 Received countdown update: ${newCountdown}`);
            setCountdown(newCountdown);

            // Add a 3-second delay before resetting the countdown after it reaches 0
            if (newCountdown === 0) {
                setTimeout(() => {
                    setCountdown(60); // Reset countdown to 60 seconds
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