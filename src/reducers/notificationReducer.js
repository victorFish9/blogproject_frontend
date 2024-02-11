import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    message: null,
    type: null,
    isVisible: false,
  },

  reducers: {
    sendNotification(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.isVisible = true;
    },
    clearNotification: (state) => {
      state.message = null;
      state.type = null;
      state.isVisible = false;
    },
  },
});

export const { sendNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
