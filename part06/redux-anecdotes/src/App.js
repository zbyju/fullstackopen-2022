import { useSelector, useDispatch } from "react-redux";
import { addVote } from "./reducers/anecdoteReducer";
import { addAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(addVote(id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const anecdote = {
      content: e.target.content.value,
    };
    e.target.content.value = "";
    dispatch(addAnecdote(anecdote));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content: <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
