import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    deleteNotification(state, action) {
      return null;
    },
  },
});

export const { createNotification, deleteNotification } =
  notificationSlice.actions;

let timeout;

export const setNotification = (text, time) => {
  if (timeout) clearTimeout(timeout);
  return async (dispatch) => {
    dispatch(createNotification(text));
    timeout = setTimeout(() => {
      dispatch(deleteNotification());
      timeout = undefined;
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
