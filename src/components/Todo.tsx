import React from "react";

const Todo = (props: { completed: boolean; text: string }) => (
  <li
    style={{
      textDecoration: props.completed ? "line-through" : "none",
    }}
  >
    {props.text}
  </li>
);

export default Todo;

//やってることはLinkとほぼ同じ。
