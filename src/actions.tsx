let nextTodoId = 0;
export const addTodo = (title: string, score: number, main: string) => ({
  type: "ADD_TODO",
  id: nextTodoId++,
  title,
  score,
  main,
});

export const setVisibilityFilter = (filter: string) => ({
  type: "SET_VISIBILITY_FILTER",
  filter,
});

export const toggleTodo = (id: number) => ({
  type: "TOGGLE_TODO",
  id,
});

export const VisibilityFilters = {
  NEW: "NEW",
  OLD: "OLD",
  HIGH: "HIGH",
  LOW: "LOW",
};

/* 
addTodoはtextを受け取って、TypeにADD_TODO、idが0から始まり、textプロパティの値は引数。
setVisibilityFilterは、filterを引数にとり、typeとfilterを設定。
toggleTodoは完了、未完了を切り替える機能で、idを引数としてとる。
VisibilityFiletersはFooterで表示されているAll、Active、Completedが押された時に発動する機能。
*/
