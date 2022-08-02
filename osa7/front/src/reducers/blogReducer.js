import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    add_blog(state, action) {
      state.blogs.push(action.payload);
    },
    add_like_or_comment(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
    },
    remove_blog(state, action) {
      const deletedBlog = action.payload;
      return state.map((blog) => {
        if (blog.id !== deletedBlog.id) return blog;
        return;
      });
    },
    set_blogs(state, action) {
      return action.payload;
    },
  },
});

export const { add_blog, add_like_or_comment, remove_blog, set_blogs } =
  blogReducer.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(set_blogs(blogs));
  };
};

export const post_blog = (
  blogData,
  name,
  setShowNotification,
  setShowAlert
) => {
  return async (dispatch) => {
    const newBlog = await blogService.handleBlog(
      blogData,
      name,
      setShowNotification,
      setShowAlert
    );
    dispatch(add_blog(newBlog));
  };
};

export const add_like_to_blog = (id, newObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.update(id, newObject);
    dispatch(add_like_or_comment(newBlog));
  };
};

export const add_comment_to_blog = (id, newObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.add_comment(id, newObject);
    dispatch(add_like_or_comment(newBlog));
  };
};

export const delete_blog = (id) => {
  return async (dispatch) => {
    const newBlog = await blogService.delete(id);
    dispatch(remove_blog(newBlog));
  };
};

export default blogReducer.reducer;
