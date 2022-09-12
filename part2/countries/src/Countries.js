import Country from "./Country";
import CountryList from "./CountryList";

const Countries = ({ countries }) => {
  return countries.length > 10 ? (
    <p>Too many matches, specify the filter</p>
  ) : countries.length > 1 ? (
    <CountryList countries={countries} />
  ) : countries.length === 1 ? (
    <Country country={countries[0]} />
  ) : (
    <p>No country found</p>
  );
};

export default Countries;
