import React, { useState } from "react";

function WeatherDashboard() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [weatherToday, setWeatherToday] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [showWeeklyForecast, setShowWeeklyForecast] = useState(false);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const apiKey = "2d783f088e2a628885b94d4e224cd734";

  const fetchWeatherData = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherToday(data);
        setLocation(data.name || `${lat}, ${lon}`);
        setError(""); // Clear error if successful
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError("Error fetching weather data. Please try again.");
      });
  };

  const fetchForecastData = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setForecast(data);
        const weeklyData = data.list
          .filter((item) => item.dt_txt.endsWith("00:00:00")) // Filter to get daily data
          .slice(0, 7); // Limit to the next 7 days
        setWeeklyForecast(weeklyData);
        setError(""); // Clear error if successful
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
        setError("Error fetching forecast data. Please try again.");
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (latitude && longitude) {
      fetchWeatherData(latitude, longitude);
      fetchForecastData(latitude, longitude);
      setShowWeeklyForecast(false); // Reset weekly forecast view on new search
    } else {
      alert("Please enter valid latitude and longitude");
    }
  };

  const handleViewMore = () => {
    if (forecast) {
      setShowWeeklyForecast(true);
    } else {
      alert("Please fetch the forecast data first.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Weather Application</h1>
      <div className="weather-today">
        <h2>Today's Weather in {location}</h2>
        {error && <p className="error">{error}</p>}
        {weatherToday ? (
          <div>
            <p>Temperature: {weatherToday.main.temp}°C</p>
            <p>Weather: {weatherToday.weather[0].description}</p>
          </div>
        ) : (
          <p>Please enter latitude and longitude to get the weather.</p>
        )}
      </div>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
        />
        <button type="submit">Get Weather</button>
      </form>
      <div className="weather-forecast">
        <h2>3-Day Forecast</h2>
        {forecast ? (
          forecast.list
            .slice(0, 3) // Get the first 3 days of forecast
            .map((item, index) => (
              <div key={item.dt} className="forecast-day">
                <h3>{new Date(item.dt_txt).toLocaleDateString()}</h3>
                <p>Temperature: {item.main.temp}°C</p>
                <p>Weather: {item.weather[0].description}</p>
                <p>Humidity: {item.main.humidity}%</p>
                <p>Wind Speed: {item.wind.speed} m/s</p>
                <p>Cloudiness: {item.clouds.all}%</p>
              </div>
            ))
        ) : (
          <p>Please enter latitude and longitude to get the forecast.</p>
        )}
      </div>
      <button className="view-more-button" onClick={handleViewMore}>
        View More
      </button>
      {showWeeklyForecast && (
        <div className="weekly-forecast">
          <h2>7-Day Forecast</h2>
          {weeklyForecast ? (
            weeklyForecast.map((item) => (
              <div key={item.dt} className="forecast-day">
                <h3>{new Date(item.dt_txt).toLocaleDateString()}</h3>
                <p>Temperature: {item.main.temp}°C</p>
                <p>Weather: {item.weather[0].description}</p>
                <p>Humidity: {item.main.humidity}%</p>
                <p>Wind Speed: {item.wind.speed} m/s</p>
                <p>Cloudiness: {item.clouds.all}%</p>
              </div>
            ))
          ) : (
            <p>Loading weekly forecast...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;
