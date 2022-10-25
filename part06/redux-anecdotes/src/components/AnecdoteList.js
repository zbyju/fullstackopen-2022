import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  deleteNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  const filteredAnecdotes = sortedAnecdotes.filter((a) =>
    a.content.toLowerCase().includes(filter)
  );
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id));
    dispatch(
      createNotification("You voted for an anecdote: " + anecdote.content)
    );
    setTimeout(() => {
      dispatch(deleteNotification());
    }, 5000);
  };

  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
