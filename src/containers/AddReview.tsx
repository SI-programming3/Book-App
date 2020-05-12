import React from "react";
import { connect, useDispatch } from "react-redux";
import { addReview } from "../actions";
import styles from "../App.module.css";

const { useState } = React;

const AddReview = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(0);
  const [review, setReview] = useState("");
  const Score = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
  const [history, setHistory] = useState(Array());

  const textChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.name === "title") setTitle(e.target.value);
    if (e.target.name === "review") setReview(e.target.value);
  };

  const scoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setScore(parseFloat(e.target.value));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!title.trim() || !review.trim()) {
      return;
    }

    const date = new Date();
    const newReview = { title, score, review, date };
    const newHistory = [...history, newReview];
    setHistory(newHistory);
    dispatch(addReview(title, score, review, date));

    console.log(newHistory);
    setTitle("");
    setReview("");
  };

  return (
    <div>
      タイトル：
      <textarea
        className={styles.title}
        name="title"
        value={title}
        onChange={textChange}
      />
      点数：
      <select onChange={scoreChange}>
        {Score.map((score) => (
          <option value={score} key={score}>
            {score}
          </option>
        ))}
      </select>
      <br />
      感想と評価
      <br />
      <textarea
        className={styles.review}
        name="review"
        value={review}
        onChange={textChange}
      />
      <button type="submit" onClick={handleSubmit}>
        完了
      </button>
    </div>
  );
};

export default connect()(AddReview);
