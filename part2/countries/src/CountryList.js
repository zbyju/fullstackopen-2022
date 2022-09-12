const CountryList = ({ countries }) => {
  return (
    <>
      {countries.map((country) => (
        <p key={country.name.common}>{country.name.common}</p>
      ))}
    </>
  );
};

export default CountryList;
