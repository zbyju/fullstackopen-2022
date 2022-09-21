const Weather = ({ weather }) => {
  console.log(weather);
  return (
    <>
      {weather === {} || weather.current_weather === undefined ? (
        <p>No weather data</p>
      ) : (
        <>
          <h4>Weather:</h4>
          <p>Temperature: {weather.current_weather.temperature}</p>
          <p>Wind speed: {weather.current_weather.windspeed}</p>
        </>
      )}
    </>
  );
};

export default Weather;
