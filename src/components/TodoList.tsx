import React from "react";
import Todo from "./Todo";
import { toggleTodo } from "../actions";
import { VisibilityFilters } from "../actions";
import { RootState } from "../reducers";
import { useDispatch, useSelector } from "react-redux";

const getVisibleTodos = (state: RootState, filter: string) => {
  switch (filter) {
    case VisibilityFilters.NEW:
      return state.todos;
    case VisibilityFilters.OLD:
      return state.todos.slice().reverse();
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const TodoList = () => {
  const items = useSelector((state: RootState) =>
    getVisibleTodos(state, state.visibilityFilter)
  );
  return (
    <ul>
      {items.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodoList;

/*
VisibleTodoListから得たtodosとtoggleTodoで、Todosに対しmap関数でコピーし、全ての要素を
  Todoにスプレッド演算子を用いて渡している。
  この時、onClickはクリックされた際にtogglTodoにtodoのidを渡す処理をするようにしている。
  正直mapstatetopropsとかを先に書いてあとで書き換える方が楽そうに思える。
*/
