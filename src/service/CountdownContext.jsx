import { createContext, useContext, useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';

const CountdownContext = createContext(null);

export function CountdownProvider({ children }) {
  const { socket } = useSocket();
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (!socket) return;

    // Listen for server updates
    socket.on('countdownUpdate', (newCountdown) => {
      console.log('⏳ Received countdown update from server:', newCountdown);
      setCountdown(newCountdown);
    });

    return () => {
      socket.off('countdownUpdate');
    };
  }, [socket]);

  return (
    <CountdownContext.Provider value={countdown}>
      {children}
    </CountdownContext.Provider>
  );
}

export function useCountdown() {
  return useContext(CountdownContext);
}
