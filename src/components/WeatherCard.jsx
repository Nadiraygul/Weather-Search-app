import { Link } from "react-router-dom";
import "./WeatherCard.scss";

export default function WeatherCard({ city, removeCity }) {
  const temp = Math.round(city.main?.temp);
  const desc = city.weather && city.weather[0] ? city.weather[0].description : "";
  const icon = city.weather && city.weather[0] ? city.weather[0].icon : "01d";
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="weather-card">
      <img src={iconUrl} alt={desc} className="weather-icon" />

      <div className="weather-info">
        <div className="weather-header">
          <div>
            <h3 className="city-name">
              {city.name}, {city.sys?.country}
            </h3>
            <p className="weather-desc">{desc}</p>
          </div>
          <div className="temp-block">
            <p className="temp">{temp}°C</p>
            <p className="feels-like">Hissedilen: {Math.round(city.main?.feels_like)}°C</p>
          </div>
        </div>

        <div className="weather-footer">
          <Link to={`/city/${city.id}`} className="detail-link">
            Detay
          </Link>
          <button
            onClick={() => removeCity(city.id)}
            className="remove-button"
          >
            Kaldır
          </button>
        </div>
      </div>
    </div>
  );
}
