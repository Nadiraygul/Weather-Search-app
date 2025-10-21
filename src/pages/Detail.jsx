import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Detail.scss";

export default function Detail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const key = "c6676a4ff07eabc69fa85a8e3ab1c07d";

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${key}&units=metric`,
          { signal: controller.signal }
        );
        const json = await res.json();
        if (json.cod && json.cod !== 200) {
          setError(json.message || "Not found");
        } else {
          setData(json);
        }
      } catch (err) {
        if (err.name !== "AbortError") setError("Network error");
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [id, key]);

  if (loading) return <div className="loading">Yükleniyor...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!data) return <div className="no-data">Veri yok</div>;

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">← Geri</Link>

      <div className="detail-card">
        <div className="weather-icon">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
            alt={data.weather[0].description}
          />
        </div>

        <div className="weather-info">
          <h1 className="city-name">
            {data.name}, <span>{data.sys?.country}</span>
          </h1>
          <p className="description">{data.weather[0].description}</p>

          <div className="weather-stats">
            <div className="stat">
              <p className="label">Sıcaklık</p>
              <p className="value">{Math.round(data.main.temp)}°C</p>
            </div>
            <div className="stat">
              <p className="label">Hissedilen</p>
              <p className="value">{Math.round(data.main.feels_like)}°C</p>
            </div>
            <div className="stat">
              <p className="label">Nem</p>
              <p className="value">{data.main.humidity}%</p>
            </div>
            <div className="stat">
              <p className="label">Rüzgar</p>
              <p className="value">{data.wind?.speed} m/s</p>
            </div>
          </div>

          <div className="extra-info">
            <p><strong>Koordinatlar:</strong> {data.coord?.lat}, {data.coord?.lon}</p>
            <p><strong>Basınç:</strong> {data.main?.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

