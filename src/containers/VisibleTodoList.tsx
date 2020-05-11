import { connect } from "react-redux";
import { toggleTodo } from "../actions";
import TodoList from "../components/TodoList";
import { VisibilityFilters } from "../actions";
import { RootState } from "../reducers";

const getVisibleTodos = (
  todos: { completed: boolean; id: number; text: string }[],
  filter: string
) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter((todos) => todos.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter((todos) => !todos.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = (state: RootState) => ({
  items: getVisibleTodos(state.todos, state.visibilityFilter),
});

const mapDispatchToProps = (dispatch: Function) => ({
  toggleTodo: (id: number) => dispatch(toggleTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

/*
filter関数で、completedがfalseなもの（active）のみを抽出したり、
  completedがtrueなもの（completed）のみを抽出している。
子コンポーネントのTodoListに渡すtodosはfilter関数を通したもの。
TodoListに渡すtoggleTodoは、引数にidを必要とする関数として渡される。
  actionのtoggleTodoにてtypeとidをつけてreducerで処理される。
*/
