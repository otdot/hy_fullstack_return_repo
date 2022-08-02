import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getOne = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

const handleBlog = async (
  blogData,
  name,
  setShowNotification,
  setShowAlert
) => {
  const config = {
    headers: { authorization: token },
  };

  const blogObject = {
    title: blogData.title,
    author: name,
    url: blogData.url,
    likes: 0,
  };
  try {
    const res = await axios.post(baseUrl, blogObject, config);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    return res.data;
  } catch (err) {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }
};

const update = async (id) => {
  const updatedBlog = await axios.get(`${baseUrl}/${id}`);
  const res = await axios.put(`${baseUrl}/${id}`, {
    ...updatedBlog.data,
    likes: updatedBlog.data.likes + 1,
  });
  return res.data;
};

const add_comment = async (id, comment) => {
  const updatedBlog = await axios.get(`${baseUrl}/${id}`);
  console.log("updatedBlog:", updatedBlog);

  const res = await axios.put(`${baseUrl}/${id}`, {
    ...updatedBlog.data,
    comments: [...updatedBlog.data.comments, comment],
  });
  return res.data;
};

const remove = async (id) => {
  const config = {
    headers: { authorization: token },
  };

  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res;
};

export default {
  setToken,
  getAll,
  getOne,
  handleBlog,
  update,
  remove,
  add_comment,
};
