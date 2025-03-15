import { useEffect, useState } from "react";
import TakarakujiLoader from "./components/loader"; // Loader component
import AppRoutes from "./routes/Approutes"; // Routing component
import useSocket from "./hooks/useSocket"; // WebSocket hook

function App() {
  const { isConnected } = useSocket();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let loadingTimeout;

    if (!isConnected) {
      setLoading(true);
    } else {
      loadingTimeout = setTimeout(() => {
        setLoading(false);
      }, 5000);
    }

    return () => {
      if (loadingTimeout) clearTimeout(loadingTimeout);
    };
  }, [isConnected]);

  return (
    <div className="app-container">
      {loading ? (
        <TakarakujiLoader onComplete={() => console.log("Loading complete!")} />
      ) : (
        <AppRoutes /> // No Router here, it's already in index.js
      )}
    </div>
  );
}

export default App;
