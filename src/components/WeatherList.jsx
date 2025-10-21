import WeatherCard from "./WeatherCard";
import "./WeatherList.scss";

export default function WeatherList({ cities = [], removeCity }) {
  if (!cities || cities.length === 0) {
    return <p className="empty-message">Henüz arama yapılmadı.</p>;
  }

  return (
    <div className="weather-list">
      {cities.map((city) => (
        <WeatherCard key={city.id} city={city} removeCity={removeCity} />
      ))}
    </div>
  );
}
