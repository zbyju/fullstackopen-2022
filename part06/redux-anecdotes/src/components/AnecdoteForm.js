import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = ({ createAnecdote }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const anecdote = {
      content: e.target.content.value,
    };
    e.target.content.value = "";
    createAnecdote(anecdote);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        Content: <input name="content" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

const mapDispatchToProps = {
  createAnecdote,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;
