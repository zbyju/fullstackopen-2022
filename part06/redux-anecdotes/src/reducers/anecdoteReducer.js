import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    addVote(state, action) {
      const id = action.payload;
      return state.map((a) => {
        if (a.id === id) {
          return { ...a, votes: 1 + a.votes };
        }
        return a;
      });
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { appendAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions;

export const initializiAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const anec = { ...anecdote, votes: 0, id: getId() };
    const newAnecdote = await anecdoteService.createNew(anec);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export default anecdoteSlice.reducer;
