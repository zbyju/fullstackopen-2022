const Country = ({ country }) => {
  return (
    <>
      <h2>
        {country.flag} {country.name.common}
      </h2>
      <p>Area: {country.area}</p>
      <p>Capital: {country.capital}</p>
      <h5>Languages:</h5>
      <ul>
        {Object.values(country.languages).map((lang) => {
          return <li key={lang}>{lang}</li>;
        })}
      </ul>
    </>
  );
};

export default Country;
