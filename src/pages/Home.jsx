import { useEffect, useState } from "react";
import WeatherList from "../components/WeatherList";
import Search from "../components/Search";


export default function Home() {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("weather_cities");
    if (saved) setCities(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("weather_cities", JSON.stringify(cities));
  }, [cities]);

  async function fetchCityWeather(cityName) {
    if (!cityName || !cityName.trim()) return;
    const key = "c6676a4ff07eabc69fa85a8e3ab1c07d";

    try {
      setError(null);
      setLoading(true);

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cityName
        )}&appid=${key}&units=metric`
      );
      const data = await res.json();
      console.log(data);
      console.log("dev branch testing");
      

      if (data.cod && data.cod !== 200) {
        setError(data.message || "No result");
      } else {
        setCities((prev) => {
          const filtered = prev.filter((c) => c.id !== data.id);
          return [data, ...filtered];
        });
        setQuery("");
      }
    } catch (err) {
      console.log(err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  function removeCity(id) {
    setCities((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>WeatherSearch App</h1>
        
        <div className="search-wrapper">
          <Search query={query} setQuery={setQuery} onSearch={() => fetchCityWeather(query)} />
        </div>
        {loading && <p className="loading">Yükleniyor...</p>}
        {error && <p className="error">{error}</p>}
        <WeatherList cities={cities} removeCity={removeCity} />
      </div>
    </div>
  );
}
