import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const anecdote = {
      content: e.target.content.value,
    };
    e.target.content.value = "";
    dispatch(addAnecdote(anecdote));
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
