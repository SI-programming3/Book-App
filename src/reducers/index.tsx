import { combineReducers } from "redux";
import reviews from "./reviews";
import visibilityFilter from "./visibilityFilter";

const rootReducer = combineReducers({
  reviews,
  visibilityFilter,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
