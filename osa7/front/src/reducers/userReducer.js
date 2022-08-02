import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userReducer = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    add_user(state, action) {
      state.blogs.push(action.payload);
    },
    set_users(state, action) {
      return action.payload;
    },
  },
});

export const { add_user, set_users } = userReducer.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(set_users(users));
  };
};

export default userReducer.reducer;
