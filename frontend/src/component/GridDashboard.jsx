import { Icon } from "@iconify/react";
import { dailyMeteo as getDailyMeteo } from "../data/dailyMeteo";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import SunriseTimeline from "./SunriseTimeLine";

const getVisibilityStatus = (visibility, isMetric) => {

  const visibilityInKm = isMetric ? visibility / 1000 : visibility / 1609.34;
  
  if (visibilityInKm >= 10) return "Excellente";
  if (visibilityInKm >= 5) return "Très bonne";
  if (visibilityInKm >= 2) return "Bonne";
  if (visibilityInKm >= 1) return "Moyenne";
  if (visibilityInKm >= 0.5) return "Faible";
  if (visibilityInKm >= 0.2) return "Très faible";
  return "Dangereuse";
};

const calculateDewPoint = (temp, humidity, isMetric) => {
  const a = 17.27;
  const b = 237.7;
  
  let tempInC = temp;
  if (!isMetric) {
    tempInC = (temp - 32) * 5/9;
  }
  
  const gamma = Math.log(humidity / 100) + (a * tempInC) / (b + tempInC);
  const dewPointC = (b * gamma) / (a - gamma);
  
  return isMetric ? dewPointC : (dewPointC * 9/5) + 32;
};

const formatTime = (timestamp) =>
  new Date(timestamp * 1000).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

const formatDuration = (sunriseTimestamp, sunsetTimestamp) => {
  const diffMs = (sunsetTimestamp - sunriseTimestamp) * 1000;
  const hours = Math.floor(diffMs / 3600000);
  const minutes = Math.floor((diffMs % 3600000) / 60000);
  return `${hours.toString().padStart(2, "0")}h ${minutes
    .toString()
    .padStart(2, "0")}min`;
};

const convertWindSpeed = (speed, isMetric) => {
  return isMetric ? (speed * 3.6).toFixed(1) : (speed * 2.23694).toFixed(1);
};

const getWindUnit = (isMetric) => {
  return isMetric ? "km/h" : "mph";
};

const convertVisibility = (visibility, isMetric) => {
  return isMetric 
    ? (visibility / 1000).toFixed(1) 
    : (visibility / 1609.34).toFixed(1);
};

const getVisibilityUnit = (isMetric) => {
  return isMetric ? "km" : "mi";
};

function GridDashboard() {
  // Sélecteurs Redux
  const forecastData = useSelector((state) => state.meteo.forecast);
  const actuelData = useSelector((state) => state.meteo.actuel);
  const aloading = useSelector((state) => state.meteo.aLoading);
  const floading = useSelector((state) => state.meteo.fLoading);
  const unitType = useSelector((state) => state.meteo.units.type);
  
  const isMetric = unitType === 'metric';
  const temperatureSymbol = isMetric ? '°C' : '°F';

  const hasCurrentData = !aloading && actuelData;
  const hasForecastData = !floading && forecastData;
  
  const dailyMeteo = hasForecastData ? getDailyMeteo(forecastData) : [];
  
  const sunrise = hasCurrentData ? formatTime(actuelData.sys.sunrise) : "";
  const sunset = hasCurrentData ? formatTime(actuelData.sys.sunset) : "";
  const dureeJr = hasCurrentData 
    ? formatDuration(actuelData.sys.sunrise, actuelData.sys.sunset)
    : "";

  const formatTemperature = (temp) => {
    return `${Math.round(temp)}${temperatureSymbol}`;
  };

  const renderCurrentWeather = () => {
    if (!hasCurrentData) {
      return <Loading />;
    }
    
    return (
      <>
        <div className="current-temp-group">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 16, fontWeight: 500 }} id="currentCity">
              {`${actuelData.name}, ${actuelData.sys.country}`}
            </span>
          </div>
          <div className="big-temp" id="currentTemp">
            {formatTemperature(actuelData.main.temp)}
          </div>
          <div className="weather-status">
            {actuelData.weather[0].description}
          </div>
          <div className="high-low">
            Max {formatTemperature(dailyMeteo[0]?.maxTemp || 0)} • Min{" "}
            {formatTemperature(dailyMeteo[0]?.minTemp || 0)}
          </div>
          <div className="weather-meta">
            <div className="meta-item">
              <Icon icon="lucide:wind" style={{ fontSize: 16 }} />
              <span>
                {convertWindSpeed(actuelData.wind.speed, isMetric)} {getWindUnit(isMetric)}
              </span>
            </div>
            <div className="meta-item">
              <Icon icon="lucide:droplets" style={{ fontSize: 16 }} />
              <span>{actuelData.main.humidity}%</span>
            </div>
            <div className="meta-item">
              <Icon icon="lucide:eye" style={{ fontSize: 16 }} />
              <span>
                {convertVisibility(actuelData.visibility, isMetric)} {getVisibilityUnit(isMetric)}
              </span>
            </div>
          </div>
        </div>
        <div className="hero-icon">
          <img
            src={`https://openweathermap.org/img/wn/${actuelData.weather[0].icon}@4x.png`}
            alt={actuelData.weather[0].description}
          />
        </div>
      </>
    );
  };

  const renderForecastChart = () => {
    if (!hasForecastData) {
      return <Loading />;
    }

    return (
      <>
        <div className="chart-header">
          <div className="section-title">Prévision sur 5 jours</div>
        </div>
        <div className="graph-container">
          {dailyMeteo.slice(1).map((day, index) => (
            <div key={index} className="day-card">
              <div className="day-info">
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                  alt={day.description}
                />
                <div>{`${day.day}. ${day.description}`}</div>
              </div>
              <div className="day-info">
                <div>
                  {convertWindSpeed(day.windSpeed / 3.6, isMetric)} {getWindUnit(isMetric)}
                </div>
                <div>{`${formatTemperature(day.minTemp)} / ${formatTemperature(day.maxTemp)}`}</div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderWindCard = () => {
    return (
      <div className="glass-card glass stat-card" style={{ padding: 20 }}>
        <div className="stat-header" style={{ marginBottom: 8 }}>
          <Icon
            icon="lucide:wind"
            style={{ fontSize: 16, color: "var(--accent)" }}
          />
          {hasCurrentData ? (
            <>
              <span>
                {convertWindSpeed(actuelData.wind.speed, isMetric)} {getWindUnit(isMetric)}
              </span>
              <span>Vent</span>
            </>
          ) : (
            <Loading />
          )}
        </div>
        {hasCurrentData && (
          <div className="compass">
            <div
              className="arrow-container"
              style={{ transform: `rotate(${actuelData.wind.deg}deg)` }}
            >
              <div className="arrow" />
            </div>
            <div className="compass-circle" />
            <div className="my-point" style={{ opacity: 0 }} />
          </div>
        )}
      </div>
    );
  };

  const renderSunCard = () => {
    if (!hasCurrentData) {
      return (
        <div className="glass-card glass stat-card">
          <div className="stat-header">
            <span>Lever & coucher du soleil</span>
            <Icon
              icon="lucide:sunrise"
              style={{ fontSize: 16, color: "var(--warning)" }}
            />
          </div>
          <Loading />
        </div>
      );
    }

    return (
      <div className="glass-card glass stat-card">
        <div className="stat-header">
          <span>Lever & coucher du soleil</span>
          <Icon
            icon="lucide:sunrise"
            style={{ fontSize: 16, color: "var(--warning)" }}
          />
        </div>
        <SunriseTimeline sunrise={sunrise} sunset={sunset} />

        <div className="stat-footer" style={{ marginTop: 24 }}>
          Durée du jour : {dureeJr}
        </div>
      </div>
    );
  };

  const renderStatsGrid = () => {
    if (!hasCurrentData) {
      return (
        <div className="stats-grid">
          <div className="glass-card glass stat-card" style={{ padding: 20 }}>
            <div className="stat-header" style={{ marginBottom: 8 }}>
              <Icon
                icon="lucide:droplets"
                style={{ fontSize: 16, color: "var(--accent)" }}
              />
              <span>Humidité</span>
            </div>
            <Loading />
          </div>
          <div className="glass-card glass stat-card" style={{ padding: 20 }}>
            <div className="stat-header" style={{ marginBottom: 8 }}>
              <Icon
                icon="lucide:eye"
                style={{ fontSize: 16, color: "var(--primary)" }}
              />
              <span>Visibilité</span>
            </div>
            <Loading />
          </div>
        </div>
      );
    }

    return (
      <div className="stats-grid">
        <div className="glass-card glass stat-card" style={{ padding: 20 }}>
          <div className="stat-header" style={{ marginBottom: 8 }}>
            <Icon
              icon="lucide:droplets"
              style={{ fontSize: 16, color: "var(--accent)" }}
            />
            <span>Humidité</span>
          </div>
          <div className="stat-value" style={{ fontSize: 20 }}>
            {actuelData.main.humidity}%
          </div>
          <div className="stat-footer" style={{ marginTop: 4 }}>
            Point de rosée :{" "}
            {formatTemperature(calculateDewPoint(actuelData.main.temp, actuelData.main.humidity, isMetric))}
          </div>
        </div>

        <div className="glass-card glass stat-card" style={{ padding: 20 }}>
          <div className="stat-header" style={{ marginBottom: 8 }}>
            <Icon
              icon="lucide:eye"
              style={{ fontSize: 16, color: "var(--primary)" }}
            />
            <span>Visibilité</span>
          </div>
          <div className="stat-value" style={{ fontSize: 20 }}>
            {convertVisibility(actuelData.visibility, isMetric)} {getVisibilityUnit(isMetric)}
          </div>
          <div className="stat-footer" style={{ marginTop: 4 }}>
            {getVisibilityStatus(actuelData.visibility, isMetric)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid-dashboard">
      <div className="grid-col">
        <div className="glass-card hero-card glass">
          {renderCurrentWeather()}
        </div>

        <div className="glass-card chart-card glass">
          {renderForecastChart()}
        </div>
      </div>

      <div className="grid-col">
        {renderWindCard()}

        {renderSunCard()}

        {renderStatsGrid()}
      </div>
    </div>
  );
}

export default GridDashboard;