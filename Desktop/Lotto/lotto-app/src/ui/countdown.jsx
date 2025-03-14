import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import useSocket from './hooks/useSocket';

function App() {
  const [count, setCount] = useState(0);
  const { isConnected, socket, countdown } = useSocket(); // ✅ Get countdown from WebSocket

  useEffect(() => {
    if (!isConnected || !socket) return;

    socket.on('welcome', (data) => {
      console.log('[ws] welcome', data);
    });

    return () => {
      socket.off('welcome');
    };
  }, [isConnected, socket]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      {/* ✅ Display Countdown Timer */}
      <div className="countdown-container">
        <h2>Countdown: {countdown}s</h2>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
