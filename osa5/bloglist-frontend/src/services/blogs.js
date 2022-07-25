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

const update = async (id, newObject) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObject);
  return res.data;
};

const remove = async (id) => {
  const config = {
    headers: { authorization: token },
  };

  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res;
};

export default { setToken, getAll, handleBlog, update, remove };
