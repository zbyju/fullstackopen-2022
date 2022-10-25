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
    createAnecdote(state, action) {
      state.push({
        ...action.payload,
        votes: action.payload.votes | 0,
        id: action.payload.id || getId(),
      });
    },
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
  },
});

export const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions;

export const initializiAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export default anecdoteSlice.reducer;
