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
