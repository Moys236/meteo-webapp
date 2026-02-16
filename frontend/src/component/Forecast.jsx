import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './carousel.css';

import { useSelector } from "react-redux";
import { Icon } from '@iconify/react';
import Loading from './Loading';

// Fonctions de conversion
const convertWindSpeed = (speed, isMetric) => {
  return isMetric ? (speed * 3.6).toFixed(0) : (speed * 2.23694).toFixed(0);
};

const getWindUnit = (isMetric) => {
  return isMetric ? "km/h" : "mph";
};

const getTemperatureSymbol = (isMetric) => {
  return isMetric ? '°C' : '°F';
};

function Forecast() {
  // Sélecteurs Redux
  const floading = useSelector((state) => state.meteo.fLoading);
  const forecastData = useSelector(state => state.meteo.forecast);
  const unitType = useSelector((state) => state.meteo.units.type);
  
  const isMetric = unitType === 'metric';
  const temperatureSymbol = getTemperatureSymbol(isMetric);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true 
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="forecast-section">
      <div className="section-header">
        <div className="section-title">Prévisions par 3 heures</div>
        
        <div className="carousel-controls">
          <button className="control-btn" onClick={scrollPrev} aria-label="Précédent">
            <Icon icon="lucide:chevron-left" />
          </button>
          <button className="control-btn" onClick={scrollNext} aria-label="Suivant">
            <Icon icon="lucide:chevron-right" />
          </button>
        </div>
      </div>
      
      <div className="carousel-viewport" ref={emblaRef}>
        <div className="carousel-container">
          {floading ? (
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            forecastData.map((f, index) => {
              const date = new Date(f.dt * 1000);
              const iconUrl = `https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`;
              
              return (
                <div className="carousel-slide" key={index}>
                  <div className="glass-card glass forecast-card">
                    <div className="forecast-day">
                      {date.toLocaleString("fr-FR", { 
                        hour: '2-digit', 
                        minute: "2-digit" 
                      })}
                    </div>
                    <img 
                      src={iconUrl} 
                      alt={f.weather[0].description} 
                      className="weather-icon" 
                    />
                    <div className="wind-speed">
                      {convertWindSpeed(f.wind.speed, isMetric)} {getWindUnit(isMetric)}
                    </div>
                    <div className="forecast-temp">
                      {Math.round(f.main.temp)}{temperatureSymbol}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Forecast;