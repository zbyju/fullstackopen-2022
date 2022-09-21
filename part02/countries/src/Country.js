import { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${country.latlng[0]}&longitude=${country.latlng[1]}&current_weather=true`
      )
      .then((weather) => setWeather(weather.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2>
        {country.flag} {country.name.common}
      </h2>
      <p>Area: {country.area}</p>
      <p>Capital: {country.capital}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang) => {
          return <li key={lang}>{lang}</li>;
        })}
      </ul>
      <Weather weather={weather} />
    </>
  );
};

export default Country;
