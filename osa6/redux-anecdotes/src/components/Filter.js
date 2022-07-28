import React from "react";
import { handleFilter } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = (props) => {
  return (
    <div>
      Search{" "}
      <input
        onChange={(e) => {
          props.handleFilter(e.target.value);
        }}
        type="text"
        name="filter"
      />
    </div>
  );
};

const connectedFilter = connect(null, { handleFilter })(Filter);

export default connectedFilter;
