import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAccount from './components/create_account';
import Login from './components/login';
import './style/App.css'; // Import external CSS

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="logo-container">
          <img src="src/assets/Takarakuji.png" alt="Logo" className="logo" />
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/" element={<Login />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;