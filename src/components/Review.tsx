import React from "react";
import { Reviews } from "../reducers/reviews";

type ReviewProps = Reviews & { onClick: () => void };

const Review: React.FC<ReviewProps> = ({
  title,
  score,
  completed,
  review,
  date,
  onClick,
}) => {
  const dateString = formatDate(date);
  return (
    <li onClick={onClick}>
      {dateString} {title}: {score}点
      <br />
      {completed ? review : ""}
    </li>
  );
};

export default Review;

function formatDate(date: Date): string {
  /*
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  return `${year}-${month}-${day} ${hour}:${min}`;
  */
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
