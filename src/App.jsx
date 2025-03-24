import { useEffect, useState } from "react";
import TakarakujiLoader from "./components/loader"
import AppRoutes from "./routes/Approutes"; 
import useSocket from "./hooks/useSocket"; 

function App() {
  const { isConnected } = useSocket();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let loadingTimeout;

    if (!isConnected) {
      setLoading(false);
    } else {
      loadingTimeout = setTimeout(() => {
        setLoading(false);
      }, 2000);
    }

    return () => {
     
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
