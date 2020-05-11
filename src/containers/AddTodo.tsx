import React from "react";
import { connect, useDispatch } from "react-redux";
import { addTodo } from "../actions";
import styles from "../App.module.css";

const { useState } = React;

const AddTodo = () => {
  const dispatch = useDispatch();
  let [title, setTitle] = useState("");
  let [main, setMain] = useState("");
  const score = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle((title = e.target.value));
    setMain((main = e.target.value));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!main.trim()) {
      return;
    }
    dispatch(addTodo(main));
    setMain((main = ""));
  };

  return (
    <div>
      タイトル：
      <textarea
        className={styles.title}
        value={title}
        onChange={handleChange}
      />
      点数：
      <select>
        {score.map((score) => (
          <option value={score} key={score}>
            {score}
          </option>
        ))}
      </select>
      <br />
      感想と評価：
      <br />
      <textarea className={styles.main} value={main} onChange={handleChange} />
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
