function FutureWeatherCard({ fTemp, fTempSymbol, fDate, fTime, fIcon }) {
  return (
    <div className="card">
      <div className="card-date-time">
        <span className="future-date">{fDate}</span>
        <span className="future-time">{fTime}</span>
      </div>
      <img src={fIcon} alt="weather-icon" className="future-icon" />
      <span className="future-temp">
        {fTemp}&#176;<span className="temp-unit">{fTempSymbol}</span>
      </span>
    </div>
  );
}

export default FutureWeatherCard;
