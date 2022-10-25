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
    updateAnecdote(state, action) {
      return state.map((a) => {
        if (a.id === action.payload.id) return action.payload;
        return a;
      });
    },
  },
});

export const { appendAnecdote, updateAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

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

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const updated = { ...anecdote, votes: 1 + anecdote.votes };
    const newAnecdote = await anecdoteService.update(updated);
    dispatch(updateAnecdote(newAnecdote));
  };
};

export default anecdoteSlice.reducer;
