const todos = (
  state: { completed: boolean; id: number; text: string }[] = [],
  action: { type: string; id: number; text: string }
) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    case "TOGGLE_TODO":
      return state.map(
        (todo: { completed: boolean; id: number; text: string }) =>
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
