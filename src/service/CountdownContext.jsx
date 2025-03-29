import { createContext, useContext, useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { socket } = useSocket();
  const [countdown, setCountdown] = useState(null);
  const [pot, setPot] = useState(null);

  useEffect(() => {
    if (!socket) return;


    socket.on('countdownUpdate', (newCountdown) => {setCountdown(newCountdown);});
    socket.on('Pot', (newPot) => {setPot(newPot);});

    return () => {
      socket.off('countdownUpdate');
      socket.off('Pot');
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{countdown, pot}}>
      {children}
    </SocketContext.Provider>
  );
}

export function useCountdown() {
  return useContext(SocketContext);
}
