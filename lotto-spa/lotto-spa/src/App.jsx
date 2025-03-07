import CreateAccount from './components/create_account';
import Login from './components/login';
import Auth from './components/auth';
import './style/App.css'; // Import external CSS

function App() {
  return (
    <div className="app-container">
      <div className="logo-container">
        <img src="src/assets/Takarakuji.png" alt="Logo" className="logo" />
      </div>
        <Login/>
    </div>
  );
}

export default App;
