// import icon1 from "../images/static-icons/rainy-3-day.svg";
import FutureWeather from "./futureWeather";
import { useState, useEffect, useRef, createContext } from "react";
import { getLocationPromise } from "../getCurrentLocation";
import { dateFormat_1, amPmTimeFormat } from "../date-time-format";
import { icons } from "../weatherIcon";

export const FWeatherContext = createContext();

function CurrentWeather() {
  // const [locationCoord, setLocationCoord] = useState({});
  const [weatherInfo, setWeatherInfo] = useState({
    date: "",
    currentTime: "loading....",
    temp: "",
    icon: "",
    sunrise: "--",
    pressure: "--",
    humidity: "--",
    wind: "--",
    visibility: "--",
    sunset: "--",
    description: "",
    city: "",
    country: "",
  });
  const [fWeatherData, setFWeatherData] = useState("");
  const [units, setUnits] = useState("metric");
  const [unitSymbol, setUnitSymbol] = useState({
    tempUnitSymbol: "C",
    windUnitSymbol: "m/s",
  });
  const locationInput = useRef();
  const [firstRender, setFirstRenderFlag] = useState(true);
  const [searchBtn, setSearchBtnFlag] = useState(false);

  useEffect(() => {
    const getWeatherData = async () => {
      let currentLocation = await getLocationPromise;
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=7f7e4358d1eb034538c592d2d12ef587&units=${units}`
      );
      let weatherData = await response.json();

      setWeatherInfo((previousState) => {
        return {
          ...previousState,
          date: dateFormat_1(new Date(weatherData.dt * 1000)),
          currentTime: "Weather . now",
          temp: parseInt(weatherData.main.temp),
          icon: weatherData.weather[0].icon,
          sunrise: amPmTimeFormat(new Date(weatherData.sys.sunrise * 1000)),
          pressure: weatherData.main.pressure,
          humidity: weatherData.main.humidity,
          wind: weatherData.wind.speed,
          visibility: weatherData.visibility / 1000,
          sunset: amPmTimeFormat(new Date(weatherData.sys.sunset * 1000)),
          description:
            weatherData.weather[0].description.charAt(0).toUpperCase() +
            weatherData.weather[0].description.slice(1),
          city: `${weatherData.name},`,
          country: weatherData.sys.country,
        };
      });

      let fWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=984780996d1e8537e803bc8568060dee&units=${units}`
      );

      let fData = await fWeatherResponse.json();
      setFWeatherData(fData);
    };

    if (firstRender) getWeatherData();
  }, [units, firstRender]);

  useEffect(() => {
    if (searchBtn) {
      handleSearchBtn();
    }
  }, [units]);

  const handleUnits = () => {
    units === "metric" ? setUnits("imperial") : setUnits("metric");
    units === "metric"
      ? setUnitSymbol({ tempUnitSymbol: "F", windUnitSymbol: "mph" })
      : setUnitSymbol({ tempUnitSymbol: "C", windUnitSymbol: "m/s" });
  };

  const handleSearchBtn = () => {
    setFirstRenderFlag(false);
    setSearchBtnFlag(true);
    let newLocation = locationInput.current.value;
    const getWDataBySearch = async () => {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${newLocation}&appid=7f7e4358d1eb034538c592d2d12ef587&units=${units}`
      );
      let data = await response.json();

      if (response.status === 200) {
        setWeatherInfo((previousState) => {
          return {
            ...previousState,
            date: dateFormat_1(new Date(data.dt * 1000)),
            currentTime: "Weather . now",
            temp: parseInt(data.main.temp),
            icon: data.weather[0].icon,
            sunrise: amPmTimeFormat(new Date(data.sys.sunrise * 1000)),
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            visibility: data.visibility / 1000,
            sunset: amPmTimeFormat(new Date(data.sys.sunset * 1000)),
            description:
              data.weather[0].description.charAt(0).toUpperCase() +
              data.weather[0].description.slice(1),
            city: `${data.name},`,
            country: data.sys.country,
          };
        });

        let fWeatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${newLocation}&appid=984780996d1e8537e803bc8568060dee&units=${units}`
        );

        let fData = await fWeatherResponse.json();
        setFWeatherData(fData);
      } else {
        alert("CITY NOT FOUND: Enter a valid city name");
      }
    };

    getWDataBySearch();
  };

  const handleSearchOnEnterKey = (event) => {
    if (event.key === "Enter") {
      handleSearchBtn();
    }
  };

  return (
    <div className="currentWeather-ctn">
      <div className="location-date-ctn">
        <div className="header">
          <div className="location-date">
            <span className="location">
              {weatherInfo.city}{" "}
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
              onKeyDown={handleSearchOnEnterKey}
              type="text"
              spellCheck="false"
              ref={locationInput}
              className="new-location-input"
              placeholder="Enter City"
              autoFocus
            />
            <button onClick={handleSearchBtn} className="search-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="currentWeather-details">
        <div className="iconTemp-detail">
          <div className="icon">
            <img className="icon-1" src={icons[weatherInfo.icon]} alt="icon" />
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
      <FWeatherContext.Provider
        value={{
          value1: fWeatherData,
          value2: unitSymbol,
        }}
      >
        <FutureWeather />
      </FWeatherContext.Provider>
    </div>
  );
}

export default CurrentWeather;
