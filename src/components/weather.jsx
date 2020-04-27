import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Weather = ({ selectedCity }) => {
  let desc =
    selectedCity.weather[0].description.charAt(0).toUpperCase() +
    selectedCity.weather[0].description.slice(1);

  let temp = Math.round(selectedCity.main.temp);
  let temp_min = Math.round(selectedCity.main.temp_min);
  let temp_max = Math.round(selectedCity.main.temp_max);

  return (
    <React.Fragment>
      <div class="card weather-card">
        <div class="card-body pb-2">
          <h4 class="card-title font-weight-bold">{selectedCity.name}</h4>

          <p class="card-text"> {desc}</p>
          <div class="d-flex justify-content-between">
            <img
              src={`http://openweathermap.org/img/wn/${selectedCity.weather[0].icon}@2x.png`}
              width="70px"
              height="70px"
              alt=""
            ></img>
            <p class="display-4 degree">{temp}&deg;</p>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <p>
              <i class="fas fa-tint fa-lg text-info pr-2"></i> Feels Like :
              {selectedCity.main.feels_like} &deg;
            </p>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <p>
              Min: {temp_min} &deg; | Max: {temp_max} &deg;
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Weather;
