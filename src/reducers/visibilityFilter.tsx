import { VisibilityFilters } from "../actions";

const visibilityFilter = (
  state = VisibilityFilters.NEW,
  action: { type: string; filter: string }
) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

export default visibilityFilter;

/*
dispatch(setVisibilityFilter(filter))でactionが実行された後に実行される。
visibilityFilterにaction.filterを代入し、出力する。
最初に呼び出された時、VisibilityFilters内でAll,Active,Completedが定義されているため、
  stateに何も入っていない初期状態ではSHOW_ALLを代入する。
*/
