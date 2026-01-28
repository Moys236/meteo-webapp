import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './carousel.css';

import { useSelector } from "react-redux";
import { Icon } from '@iconify/react';

function Forecast() {
  const forecastData = useSelector(state => state.meteo.forecast);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true 
  });

  // Fonctions de navigation pour le laptop
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
        
        {/* Boutons visibles sur laptop */}
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
          {forecastData.map((f, index) => {
            const date = new Date(f.dt * 1000);
            const iconUrl = `https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`;
            
            return (
              <div className="carousel-slide" key={index}>
                <div className="glass-card glass forecast-card">
                  <div className="forecast-day">
                    {date.toLocaleString("fr-FR", { hour: '2-digit', minute: "2-digit" })}
                  </div>
                  <img src={iconUrl} alt="weather" className="weather-icon" />
                  <div className="wind-speed">{Math.round(f.wind.speed * 3.6)} km/h</div>
                  <div className="forecast-temp">{Math.round(f.main.temp)}°</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  
    // return (
    //      <div className="forecast-section">
    //         <div className="section-title">Prévisions sur 5 jours par 3 heurs</div>
    //         <div className="forecast-row">
    //           {forecastData.map((f, index)=>{
    //             const date = new Date(f.dt * 1000);
    //             const iconUrl = `https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`;
    //             return (
    //             <div className="glass-card glass forecast-card" key={index}>
    //               <div className="forecast-day">{date.toLocaleString("fr-FR",{hour: '2-digit', minute: "2-digit"})}</div>
    //               {/* <Icon icon="lucide:cloud-rain" style={{fontSize: 32, color: "var(--primary)"}} /> */}
    //               <img src={iconUrl} alt="icon" className="weather-icon" />
    //               <div>{Math.round(f.wind.speed * 3.6)} km/h</div>
    //               <div className="forecast-temp">{Math.round(f.main.temp)} <span style={{color: 'var(--muted-foreground)', fontWeight: 400, fontSize: 14}}></span></div>
    //             </div>
    //           )})}
    //         </div>
    //       </div>
    // )
}

export default Forecast;