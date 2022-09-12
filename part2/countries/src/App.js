import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./Countries";
import FilterCountries from "./FilterCountries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState("");

  function filterCountries() {
    const newFilteredCountries =
      filter === ""
        ? countries
        : countries.filter((country) =>
            country.name.common.toLowerCase().includes(filter)
          );
    setFilteredCountries(newFilteredCountries);
  }

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((countries) => {
      setCountries(countries.data);
    });
  }, []);

  useEffect(() => {
    filterCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, countries]);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  return (
    <div className="App">
      <FilterCountries value={filter} onChange={handleFilterChange} />
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
