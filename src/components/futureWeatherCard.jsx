function FutureWeatherCard({
  fTemp,
  fTempSymbol,
  fDate,
  fTime,
  fIcon,
  fDescription,
}) {
  return (
    <div className="card">
      <div className="card-date-time">
        <span className="future-date">{fDate}</span>
        <span className="future-time">{fTime}</span>
      </div>
      <img src={fIcon} alt="weather-icon" className="future-icon" />
      <div className="future-temp-description">
        <span className="future-description">{fDescription}</span>
        <span className="future-temp">
          {fTemp}&#176;<span className="temp-unit">{fTempSymbol}</span>
        </span>
      </div>
    </div>
  );
}

export default FutureWeatherCard;
