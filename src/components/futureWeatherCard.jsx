import icon2 from "../images/static-icons/rainy-2-day.svg";

function FutureWeatherCard() {
  return (
    <div className="card">
      <div className="card-date-time">
        <span className="future-date">September 29</span>
        <span className="future-time">3:00 am</span>
      </div>
      <img src={icon2} alt="weather-icon" className="future-icon" />
      <span className="future-temp">
        16&#176;<span className="temp-unit">C</span>
      </span>
    </div>
  );
}

export default FutureWeatherCard;
