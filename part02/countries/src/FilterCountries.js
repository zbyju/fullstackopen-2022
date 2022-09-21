const FilterCountries = ({ value, onChange }) => {
  return (
    <>
      Filter countries:{" "}
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </>
  );
};

export default FilterCountries;
