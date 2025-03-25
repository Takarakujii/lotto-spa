import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function useCountdown() {
  const [countdown, setCountdown] = useState(60);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect directly to localhost:3001
    const socket = io('http://localhost:3001');

    // Connection events
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('✅ Connected to countdown server on port 3001');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('❌ Disconnected from countdown server');
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err.message);
    });

    // Countdown updates
    socket.on('countdownUpdate', (time) => {
      console.log('Received countdown update:', time);
      setCountdown(time);
    });

    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, []);

  return countdown;
}