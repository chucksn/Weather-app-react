import icon1 from "../images/static-icons/rainy-3-day.svg";
import FutureWeather from "./futureWeather";
import { useState, useEffect, useRef } from "react";
import { weekdays, months } from "../weekdays-months";
import { getLocationPromise } from "../location";

function CurrentWeather() {
  // function that gives date in the format - Monday 5 July
  const dateFormat_1 = (date) => {
    let weekday = weekdays[date.getDay()];
    let dayOfMonth = date.getDate();
    let month = months[date.getMonth()];
    let myDateFormat = `${weekday} ${dayOfMonth} ${month}`;
    return myDateFormat;
  };

  // function that gives date in the format - July 5
  const dateFormat_2 = (date) => {
    let dayOfMonth = date.getDate();
    let month = months[date.getMonth()];
    let myDateFormat = `${month} ${dayOfMonth}`;
    return myDateFormat;
  };

  // function that give time in am-pm format
  const amPmTimeFormat = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let amPm = hours >= 12 ? "pm" : "am";
    hours %= 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    let strTime = `${hours}:${minutes} ${amPm}`;
    return strTime;
  };

  const [weatherInfo, setWeatherInfo] = useState({});
  const [units, setUnits] = useState("metric");
  const [unitSymbol, setUnitSymbol] = useState({
    tempUnitSymbol: "C",
    windUnitSymbol: "m/s",
  });
  const [locationCoord, setLocationCoord] = useState({});

  // imported promise from location.js to get latitude & longitude
  getLocationPromise
    .then((location) => {
      setLocationCoord(location);
    })
    .catch((err) => alert(err));

  const handleUnits = () => {
    units === "metric" ? setUnits("imperial") : setUnits("metric");
    units === "metric"
      ? setUnitSymbol({ tempUnitSymbol: "F", windUnitSymbol: "mph" })
      : setUnitSymbol({ tempUnitSymbol: "C", windUnitSymbol: "m/s" });
  };

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${locationCoord.latitude}&lon=${locationCoord.longitude}&appid=7f7e4358d1eb034538c592d2d12ef587&units=${units}`
    )
      .then((response) => response.json())
      .then((data) => {
        let cityNameData = data.name;
        let countryCodeData = data.sys.country;
        let TempData = parseInt(data.main.temp);
        let pressureData = data.main.pressure;
        let tempMaxData = parseInt(data.main.temp_max);
        let tempMinData = parseInt(data.main.temp_min);
        let humidityData = data.main.humidity;
        let windData = data.wind.speed;
        let weatherDescriptionData =
          data.weather[0].description.charAt(0).toUpperCase() +
          data.weather[0].description.slice(1);
        let visibilityData = data.visibility / 1000;
        let currentDateData = dateFormat_1(new Date(data.dt * 1000));
        let sunriseData = amPmTimeFormat(new Date(data.sys.sunrise * 1000));
        let sunsetData = amPmTimeFormat(new Date(data.sys.sunset * 1000));
        let currentTimeData = amPmTimeFormat(new Date());

        setWeatherInfo((previousState) => {
          return {
            ...previousState,
            date: currentDateData,
            currentTime: currentTimeData,
            temp: TempData,
            sunrise: sunriseData,
            pressure: pressureData,
            maxTemp: tempMaxData,
            minTemp: tempMinData,
            humidity: humidityData,
            wind: windData,
            visibility: visibilityData,
            sunset: sunsetData,
            description: weatherDescriptionData,
            city: cityNameData,
            country: countryCodeData,
          };
        });
      });
  }, [units, locationCoord]);

  return (
    <div className="currentWeather-ctn">
      <div className="location-date-ctn">
        <div className="header">
          <div className="location-date">
            <span className="location">
              {weatherInfo.city},{" "}
              <span className="countryCode">{weatherInfo.country}</span>
            </span>
            <span className="date">{weatherInfo.date}</span>
            <span className="current-time">{weatherInfo.currentTime}</span>
          </div>

          <div className="units-selection">
            <label htmlFor="units" className="unit-text">
              Unit -{"  "}
            </label>
            <select name="unit" id="unit-selected" onChange={handleUnits}>
              <option value="metric">Metric</option>
              <option value="imperial">Imperial</option>
            </select>
          </div>
          <div className="new-location">
            <input
              type="text"
              className="new-location-input"
              placeholder="Enter new location"
              autoFocus
            />
            <button className="search-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="currentWeather-details">
        <div className="iconTemp-detail">
          <div className="icon">
            <img className="icon-1" src={icon1} alt="weather icon" />
          </div>
          <div className="tempAndDescription">
            <span className="temp">
              {weatherInfo.temp}&#176;
              <span className="temp-unit">{unitSymbol.tempUnitSymbol}</span>
            </span>
            <span className="description">{weatherInfo.description}</span>
          </div>
        </div>
        <div className="other-details">
          <div className="top">
            <div className="parameter">
              <span className="values">
                {weatherInfo.wind}{" "}
                <span className="units">{unitSymbol.windUnitSymbol}</span>
              </span>
              <p>Wind</p>
            </div>
            <div className="parameter">
              <span className="values">
                {weatherInfo.humidity} <span className="units">%</span>
              </span>
              <p>Humidity</p>
            </div>
            <div className="parameter">
              <span className="values">{weatherInfo.sunrise}</span>
              <p>Sunrise</p>
            </div>
          </div>
          <div className="bottom">
            <div className="parameter">
              <span className="values">
                {weatherInfo.pressure} <span className="units">hPa</span>
              </span>
              <p>Pressure</p>
            </div>
            <div className="parameter">
              <span className="values">
                {weatherInfo.visibility} <span className="units">km</span>
              </span>
              <p>Visibility</p>
            </div>

            <div className="parameter">
              <span className="values">{weatherInfo.sunset}</span>
              <p>Sunset</p>
            </div>
          </div>
        </div>
      </div>
      <FutureWeather />
    </div>
  );
}

export default CurrentWeather;
