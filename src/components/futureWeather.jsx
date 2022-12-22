import FutureWeatherSlides from "./futureWeatherSlides";

function FutureWeather() {
  return (
    <div className="future-weather">
      <span className="future-weather-text">
        Future Weather <span>&#10088;5 Days Forecast - 3 hourly&#10089;</span>
      </span>
      <FutureWeatherSlides />
    </div>
  );
}

export default FutureWeather;
