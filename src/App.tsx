import React from "react";
import AddTodo from "./containers/AddTodo";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      Book
      <AddTodo />
      <Footer />
      <TodoList />
    </div>
  );
}

export default App;
