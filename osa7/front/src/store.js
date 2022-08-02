import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import loginReducer from "./reducers/loginReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    users: userReducer,
    login: loginReducer,
  },
});

store.subscribe(() => console.log("blogs", store.getState()));

export default store;
