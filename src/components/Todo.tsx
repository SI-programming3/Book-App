import React from "react";

const Todo = (props: {
  completed: boolean;
  title: string;
  score: number;
  main: string;
}) => (
  <li
    style={{
      textDecoration: props.completed ? "line-through" : "none",
    }}
  >
    {props.title}:{props.score}点:{props.main}
  </li>
);

export default Todo;

//やってることはLinkとほぼ同じ。
