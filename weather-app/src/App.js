import React, { useState } from "react";
import "./styles.css"; // Import your styles
import Login from "./components/Login";
import WeatherDashboard from "./components/WeatherDashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <WeatherDashboard />
      )}
    </div>
  );
}

export default App;
