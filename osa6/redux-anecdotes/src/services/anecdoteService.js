import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  console.log(res.data);
  return res.data;
};

const createNew = async (content) => {
  const anecdoteObject = {
    content,
    votes: 0,
  };
  const res = await axios.post(baseUrl, anecdoteObject);
  return res.data;
};

const addLike = async (id) => {
  const incAnecdote = await axios.get(`${baseUrl}/${id}`);
  const res = await axios.put(`${baseUrl}/${id}`, {
    ...incAnecdote.data,
    votes: incAnecdote.data.votes + 1,
  });
  return res.data;
};

export default { getAll, createNew, addLike };
