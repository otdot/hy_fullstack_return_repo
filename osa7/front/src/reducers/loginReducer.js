import { createSlice } from "@reduxjs/toolkit";
import { login } from "../services/login";
import blogService from "../services/blogs";

const loginReducer = createSlice({
  name: "login",
  initialState: { loggedUser: null, errorMessage: null },
  reducers: {
    setLoggedUser(state, action) {
      return { ...state, loggedUser: action.payload };
    },
    setErrorMessage(state, action) {
      return { ...state, errorMessage: action.payload };
    },
    logout() {
      window.localStorage.removeItem("loggedBlogAppUser");
      blogService.setToken("");
      return { loggedUser: null, errorMessage: null };
    },
  },
});

export const { setLoggedUser, logout, setErrorMessage } = loginReducer.actions;

export const initializeLoggedUser = (loginData) => {
  return async (dispatch) => {
    try {
      const loggedUser = await login(loginData);
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(loggedUser)
      );
      blogService.setToken(loggedUser.token);
      dispatch(setLoggedUser(loggedUser));
      return;
    } catch (exception) {
      dispatch(setErrorMessage("wrong credentials"));
      setTimeout(() => {
        dispatch(setErrorMessage(null));
      }, 5000);
    }
  };
};

export default loginReducer.reducer;
