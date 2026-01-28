import { Icon } from "@iconify/react";
import { dailyMeteo as getDailyMeteo } from "../data/dailyMeteo";
import { useSelector } from "react-redux";


function GridDashboard() {
    const forecastData = useSelector(state => state.meteo.forecast);
    const actuelData = useSelector(state => state.meteo.actuel);
    const dailyMeteo = getDailyMeteo(forecastData);

    function getVisibilityStatus(visibility) {
      if (visibility >= 10000) return "Excellente";
      if (visibility >= 5000) return "Très bonne";
      if (visibility >= 2000) return "Bonne";
      if (visibility >= 1000) return "Moyenne";
      if (visibility >= 500) return "Faible";
      if (visibility >= 200) return "Très faible";
      return "Dangereuse";
    }

    function calculateDewPoint(temp, humidity) {
      const a = 17.27;
      const b = 237.7;

      const gamma =
        Math.log(humidity / 100) +
        (a * temp) / (b + temp);

      const dewPoint =
        (b * gamma) / (a - gamma);

      return Number(dewPoint.toFixed(1));
    }

    const formatTime = (timestamp) => 
      new Date(timestamp * 1000).toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });

    const sunrise = formatTime(actuelData.sys.sunrise);
    const sunset = formatTime(actuelData.sys.sunset);

    const diffMs = (actuelData.sys.sunset - actuelData.sys.sunrise) * 1000;
    const hours = Math.floor(diffMs / 3600000); // 1000 * 60 * 60
    const minutes = Math.floor((diffMs % 3600000) / 60000); // 1000 * 60
    const dureeJr = `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}min`;
    return (
      <div className="grid-dashboard">
        <div className="grid-col">
          <div className="glass-card hero-card glass">
            <div className="current-temp-group">
              <div style={{display: "flex", alignItems: "center", gap: 8, marginBottom: 8}}>
                <span style={{fontSize: 16, fontWeight: 500}} id="currentCity">{actuelData.name + ', ' + actuelData.sys.country}</span>
              </div>
              <div className="big-temp" id="currentTemp">{Math.round(actuelData.main.temp)}°C</div>
              <div className="weather-status">{actuelData.weather[0].description}</div>
              <div className="high-low">Max {Math.round(dailyMeteo[0].maxTemp)}° • Min {Math.round(dailyMeteo[0].minTemp)}°</div>
              <div className="weather-meta">
                <div className="meta-item">
                  <Icon icon="lucide:wind" style={{fontSize: 16}} />
                  <span>{(actuelData.wind.speed * 3.6).toFixed(1)} km/h</span>
                </div>
                <div className="meta-item">
                  <Icon icon="lucide:droplets" style={{fontSize: 16}} />
                  <span>{actuelData.main.humidity}%</span>
                </div>
                <div className="meta-item">
                  <Icon icon="lucide:eye" style={{fontSize: 16}} />
                  <span>{actuelData.visibility / 1000} km</span>
                </div>
              </div>
            </div>
            <div className="hero-icon">
              <img src={`https://openweathermap.org/img/wn/${actuelData.weather[0].icon}@4x.png`} alt="icon" />
            </div>
          </div>

          <div className="glass-card chart-card glass">
            <div className="chart-header">
              <div className="section-title">Prévision sur 5 jours</div>
            </div>
            <div className="graph-container">
              {dailyMeteo.map((j, index)=> (
                index !== 0 && (<div key={index} className="day-card">
                  <div className="day-info" >
                    <img src={`https://openweathermap.org/img/wn/${j.icon}.png`} alt="icon" />
                    <div>{j.day + ". " + j.description}</div>
                  </div>
                  <div className="day-info">
                    <div>{Number(j.windSpeed.toFixed(1))} km/h</div>
                    <div>
                      {`${Math.round(j.minTemp)}° / ${Math.round(j.maxTemp)}°`}
                    </div>
                  </div>
                </div>)
              ))}
              
            </div>
          </div>
        </div>


        <div className="grid-col">
            <div className="glass-card glass stat-card" style={{padding: 20}}>
              <div className="stat-header" style={{marginBottom: 8}}>
                <Icon icon="lucide:wind" style={{fontSize: 16, color: "var(--accent)"}} />
                <span>{actuelData.wind.speed.toFixed(1)} km/h</span>
                <span>Vent</span>
              </div>
              <div className="compass">
                <div className="arrow-container" style={{transform: `rotate(${actuelData.wind.deg}deg)`}}>
                  <div className="arrow" />
                </div>

                <div
                  className="compass-circle"
                />
                <div className="my-point" style={{ opacity: 0 }} />
              </div>
            </div>
            

          <div className="glass-card glass stat-card">
            <div className="stat-header">
              <span>Lever & coucher du soleil</span>
              <Icon icon="lucide:sunrise" style={{fontSize: 16, color: "var(--warning)"}} />
            </div>
            <div className="sunrise-timeline">
              <svg width="100%" height="40" viewBox="0 0 200 40" preserveAspectRatio="none" style={{overflow: 'visible'}}>
                <path d="M0,40 Q100,-20 200,40" fill="none" stroke="rgba(15, 23, 42, 0.16)" strokeWidth="1" strokeDasharray="4 4"></path>
                <circle cx="60" cy="18" r="8" fill="#FFB020" style={{filter: 'drop-shadow(0 0 8px rgba(255, 176, 32, 0.8))'}}></circle>
              </svg>
              <div style={{position: 'absolute', left: 0, bottom: -20, fontSize: 12, color: 'var(--muted-foreground)'}}>{sunrise}</div>
              <div style={{position: 'absolute', right: 0, bottom: -20, fontSize: 12, color: 'var(--muted-foreground)'}}>{sunset}</div>
            </div>
            <div className="stat-footer" style={{marginTop: 24}}>Durée du jour : {dureeJr}</div>
          </div>

          <div className="stats-grid">
            <div className="glass-card glass stat-card" style={{padding: 20}}>
              <div className="stat-header" style={{marginBottom: 8}}>
                <Icon icon="lucide:droplets" style={{fontSize: 16, color: "var(--accent)"}} />
                <span>Humidité</span>
              </div>
              <div className="stat-value" style={{fontSize: 20}}>{actuelData.main.humidity}%</div>
              <div className="stat-footer" style={{marginTop: 4}}>Point de rosée : {calculateDewPoint(actuelData.main.temp, actuelData.main.humidity)}°</div>
            </div>
            <div className="glass-card glass stat-card" style={{padding: 20}}>
              <div className="stat-header" style={{marginBottom: 8}}>
                <Icon icon="lucide:eye" style={{fontSize: 16, color: "var(--primary)"}} />
                <span>Visibilité</span>
              </div>
              <div className="stat-value" style={{fontSize: 20}}>{actuelData.visibility / 1000} km</div>
              <div className="stat-footer" style={{marginTop: 4}}>{getVisibilityStatus(actuelData.visibility)}</div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default GridDashboard;