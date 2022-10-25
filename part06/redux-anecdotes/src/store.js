import anecdoteReducer from "./reducers/anecdoteReducer";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
  },
});
