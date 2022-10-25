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
export default notificationSlice.reducer;
