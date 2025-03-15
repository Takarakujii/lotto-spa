/* eslint no-restricted-globals: ["error", "event"] */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";
import './style/index.css'; // Ensure CSS is imported
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App /> {/* Render the App component */}
    </BrowserRouter>
  </StrictMode>,
);