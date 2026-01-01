import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import BootstrapSequence from "./components/BootstrapSequence";

const App: React.FC = () => {
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    const booted = sessionStorage.getItem("hydra_booted");
    if (booted) {
      setIsBooted(true);
    }
  }, []);

  const handleBootComplete = () => {
    setIsBooted(true);
    sessionStorage.setItem("hydra_booted", "true");
  };

  return (
    <div className="min-h-screen bg-[#020202] text-[#06af6e]">
      {!isBooted ? (
        <BootstrapSequence onComplete={handleBootComplete} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default App;