import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import { useEffect, useState } from 'react';
import TakarakujiLoader from './components/loader'; // Import the loader component
import AppRoutes from './routes/Approutes'; // Import the routing component
import useSocket from './hooks/useSocket'; // Import the useSocket hook

function App() {
  const { isConnected } = useSocket(); // Get connection status
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false); // Hide loader after delay when connected
    }, 2000); // Delay for 2 seconds

    if (!isConnected) {
      setLoading(true); // Show loader when not connected
    }

    return () => clearTimeout(loadingTimeout); // Cleanup timeout on unmount
  }, [isConnected]);

  return (
    <Router>
      <div className="app-container">
        {loading ? ( // Conditional rendering of the loader
          <TakarakujiLoader onComplete={() => console.log('Loading complete!')} />
        ) : (
          <AppRoutes /> // Render the routing component after loading
        )}
      </div>
    </Router>
  );
}

export default App;