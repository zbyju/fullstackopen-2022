import { connect } from "react-redux";
import { changeFilter } from "../reducers/filterReducer";

const FilterAnecdotes = ({ changeFilter }) => {
  return (
    <>
      Filter:
      <input onChange={(e) => changeFilter(e.target.value)} />
    </>
  );
};

const mapDispatchToProps = {
  changeFilter,
};

const ConnectedFilterAnecdotes = connect(
  null,
  mapDispatchToProps
)(FilterAnecdotes);
export default ConnectedFilterAnecdotes;
