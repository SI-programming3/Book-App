import React from "react";

const Todo = (props: {
  completed: boolean;
  title: string;
  score: number;
  review: string;
  onClick: () => { type: string; id: number };
}) => {
  let review: string;
  if (props.completed) {
    review = props.review;
  } else {
    review = "";
  }
  return (
    <li onClick={props.onClick}>
      {props.title}:{props.score}点
      <br />
      {review}
    </li>
  );
};

export default Todo;

//やってることはLinkとほぼ同じ。
