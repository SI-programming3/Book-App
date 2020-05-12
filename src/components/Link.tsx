import React from "react";
import { setVisibilityFilter } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";

const Link: React.FC<{ filter: string }> = ({ filter, children }) => {
  const active = useSelector(
    (state: RootState) => filter === state.visibilityFilter
  );
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(setVisibilityFilter(filter))}
      disabled={active}
      style={{
        marginLeft: "4px",
      }}
    >
      {children}
    </button>
  );
};

export default Link;
