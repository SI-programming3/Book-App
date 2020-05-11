const todos = (
  state: {
    completed: boolean;
    id: number;
    title: string;
    score: number;
    review: string;
  }[] = [],
  action: {
    type: string;
    id: number;
    title: string;
    score: number;
    review: string;
  }
) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          score: action.score,
          review: action.review,
          completed: false,
        },
      ];
    case "TOGGLE_TODO":
      return state.map(
        (todo: {
          completed: boolean;
          id: number;
          title: string;
          score: number;
          review: string;
        }) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

export default todos;

/*
stateに何も入っていなかった時のみstateの中身が空行列になる。
dispatchした時のactionのtypeがADD_TODO,TOGGLE_TODOのときに呼び出される。

ADD_TODOのreturnで...stateしているのは、stateをそのまま更新してはいけないため。
  新しくstateを作成し、それを新しいstateとして更新する。
id,text,completedはネストで保管される

TOGGLE_TODOのreturnでは、stateの中身をtodoという変数に代入し、todoのidと
  dispatchした時のactionのidが同じ時に、完了と未完了の切り替えを行う。
  切り替えが終わったら、その新しいstateをstoreへ渡す。
*/
