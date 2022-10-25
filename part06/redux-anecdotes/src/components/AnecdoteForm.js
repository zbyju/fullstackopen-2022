import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdoteService";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const anecdote = {
      content: e.target.content.value,
    };
    e.target.content.value = "";
    dispatch(createAnecdote(anecdote));
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

export default AnecdoteForm;
