import React from "react";
import AddTodo from "./containers/AddTodo";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      本のレビュー
      <AddTodo />
      <Footer />
      <TodoList />
    </div>
  );
}

export default App;
