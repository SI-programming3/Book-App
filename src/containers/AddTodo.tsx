import React from "react";
import { connect, useDispatch } from "react-redux";
import { addTodo } from "../actions";
import styles from "../App.module.css";

const { useState } = React;

const AddTodo = () => {
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
    const newHistory = [
      ...history,
      { title: title, score: score, review: review },
    ];
    setHistory(newHistory);
    dispatch(addTodo(title, score, review));
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

export default connect()(AddTodo);

/*
onSubmitは送信ボタン（submit）が押された時に起動するイベント。
preventDefaultはイベントをキャンセルできる時にキャンセルする関数。
  イベントはテキストエリアの入力やチェックボックスのチェックなど。
  この場合typeがsubmitのボタンが押された時にフォームを送信し送信先のURLに飛ばないようにしている
inputのところはコールバックref。 この場合nodeの中にはDOM要素の参照が入っている。
  .valueでinputの際の値が出せる。

dispatch:Functionだとダメでdispatch{dispatch:Function}なら良い理由がわからない。

*/
