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

export const setNotification = (text, time) => {
  return async (dispatch) => {
    dispatch(createNotification(text));
    setTimeout(() => {
      dispatch(deleteNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
