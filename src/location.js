let getLocationPromise = new Promise((resolve, reject) => {
  const success = (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    resolve({ latitude: lat, longitude: long });
  };

  const error = (err) => {
    reject(err.message);
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  } else {
    alert("Geolocation API is not supported by this browser");
  }
});
export { getLocationPromise };
