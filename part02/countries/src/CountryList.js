import { useState } from "react";
import Country from "./Country";

const CountryList = ({ countries }) => {
  const [showCountries, setShowCountries] = useState(
    countries.map((country) => ({
      ...country,
      show: false,
    }))
  );

  function handleShowClick(name) {
    const newShowCountries = showCountries.map((country) => {
      if (country.name.common === name) {
        return { ...country, show: !country.show };
      }
      return country;
    });
    setShowCountries(newShowCountries);
  }

  return (
    <>
      {showCountries.map((country) => (
        <div key={country.name.common}>
          <br />
          <span>{country.name.common} </span>
          <button onClick={() => handleShowClick(country.name.common)}>
            {country.show ? "Hide" : "Show"}
          </button>
          {country.show && <Country country={country} />}
        </div>
      ))}
    </>
  );
};

export default CountryList;
