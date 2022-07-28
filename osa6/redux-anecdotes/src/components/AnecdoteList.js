import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  initializeAnecdotes,
  updateAnecdote,
} from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReduces";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) =>
    state.filter === ""
      ? state.anecdotes
      : state.anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
  );

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const combineFuncs = async (anecdote) => {
    dispatch(updateAnecdote(anecdote.id));
    dispatch(setNotification(anecdote.content, 5000));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              combineFuncs(anecdote);
            }}
          />
        ))
        .sort((a, b) => b.props.anecdote.votes - a.props.anecdote.votes)}
    </div>
  );
};

export default AnecdoteList;
