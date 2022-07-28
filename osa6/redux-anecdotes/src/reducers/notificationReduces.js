import { createSlice } from "@reduxjs/toolkit";

const initialState = "your vote: ";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    changeNotification(state, action) {
      const notification = action.payload;
      return notification;
    },
    closeNotification() {
      return "";
    },
  },
});

export const { changeNotification, closeNotification } =
  notificationSlice.actions;

let timeoutId;
export const setNotification = (notification, time) => {
  return (dispatch) => {
    console.log("timeoutid, ", timeoutId);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    dispatch(changeNotification(notification));
    timeoutId = setTimeout(() => {
      dispatch(closeNotification());
    }, time);
  };
};

export default notificationSlice.reducer;
