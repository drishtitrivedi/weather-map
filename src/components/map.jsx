import React, { Component, useState } from "react";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  InfoWindow,
} from "react-google-maps";
import Weather from "./weather";
import "./utils/weather.css";

// API call : http://api.openweathermap.org/data/2.5/group?id=5936286,5955902,6162949,6113365,6180144,6121621,5932311&units=metric
const openWeatherAPIKEY = "YOUR-API-KEY";

class Map extends Component {
  state = {
    weatherdata: [],
    selectedCity: null,
  };

  componentDidMount() {
    fetch(
      `http://api.openweathermap.org/data/2.5/group?id=5936286,5955902,6162949,6113365,6180144,6121621,5932311&units=metric&APPID=${openWeatherAPIKEY}`
    )
      .then((res) => res.json())
      .then((weatherdata) =>
        this.setState({ weatherdata: weatherdata.list }, () =>
          console.log("Data fetched ... ", weatherdata.list)
        )
      );
  }

  setSelectedCity = (city) => {
    this.setState({ selectedCity: city });
  };

  getMap = () => {
    const [selectedCity, setSelectedCity] = useState(this.state.selectedCity);
    return (
      <GoogleMap
        defaultZoom={5}
        defaultCenter={{ lat: 55.480252, lng: -121.571614 }}
      >
        {this.state.weatherdata.map((data) => (
          <Marker
            key={data.id}
            position={{ lat: data.coord.lat, lng: data.coord.lon }}
            onClick={() => {
              setSelectedCity(data);
            }}
            icon={{
              url: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
              backgroundColor: "#030303",
              labelOrigin: { x: 40, y: 85 },
            }}
            label={{
              text: data.name + " " + data.main.temp + "\u00b0",
              color: "#ffffff",
            }}
          ></Marker>
        ))}

        {selectedCity && (
          <InfoWindow
            position={{
              lat: selectedCity.coord.lat,
              lng: selectedCity.coord.lon,
            }}
            onCloseClick={() => {
              setSelectedCity(null);
            }}
          >
            <Weather
              selectedCity={selectedCity}
              getWeatherIcon={this.getWeatherIcon}
            />
          </InfoWindow>
        )}
      </GoogleMap>
    );
  };

  render() {
    const WrappedMap = withScriptjs(withGoogleMap(this.getMap));
    return (
      <React.Fragment>
        <center class="mt-2 mb-4">
          <h4 style={{ color: "#0000ff" }}>
            Click on weather Icon for more details
          </h4>
        </center>

        <center>
          <div style={{ width: "60%" }}>
            <WrappedMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=YOUR-GOOGLE-MAP-API-KEY"
              loadingElement={<div style={{ height: `70%` }} />}
              containerElement={<div style={{ height: `720px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </center>
      </React.Fragment>
    );
  }
}

export default Map;
