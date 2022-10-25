import { useDispatch } from "react-redux";
import { changeFilter } from "../reducers/filterReducer";

const FilterAnecdotes = () => {
  const dispatch = useDispatch();

  return (
    <>
      Filter:
      <input onChange={(e) => dispatch(changeFilter(e.target.value))} />
    </>
  );
};

export default FilterAnecdotes;
