import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import useSocket from './hooks/useSocket';

function App() {
  const { isConnected, socket, countdown } = useSocket(); // ✅ Get countdown from WebSocket

  return (
    <div className="app-container">
      <header>
        <div className="logo-container">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
      </header>

      {/* ✅ Display Countdown Timer */}
      <div className="countdown-container">
        <h2>Countdown: <span className="countdown">{countdown}s</span></h2>
      </div>

      {isConnected ? <p>✅ Connected to WebSocket</p> : <p>❌ Not connected</p>}
    </div>
  );
}

export default App;
