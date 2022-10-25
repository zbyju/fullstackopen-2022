import Notification from "./components/Notification";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import FilterAnecdotes from "./components/FilterAnecdotes";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterAnecdotes />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default App;
