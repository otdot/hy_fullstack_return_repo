import React from "react";
import { connect } from "react-redux";
import { createNew } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
  const add_new = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = "";
    props.createNew(anecdote);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add_new}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};
const connectedAnecdoteForm = connect(null, { createNew })(AnecdoteForm);

export default connectedAnecdoteForm;
