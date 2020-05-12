import React from "react";
import Review from "./Review";
import { toggle } from "../actions";
import { VisibilityFilters } from "../actions";
import { RootState } from "../reducers";
import { useDispatch, useSelector } from "react-redux";

const getVisibleReviews = (state: RootState, filter: string) => {
  switch (filter) {
    case VisibilityFilters.NEW:
      return [...state.reviews].sort(
        (a, b) => b.date.getTime() - a.date.getTime()
      );
    case VisibilityFilters.OLD:
      return [...state.reviews].sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      );
    case VisibilityFilters.HIGH:
      return state.reviews.slice().sort((a, b) => {
        return b.score - a.score;
      });
    case VisibilityFilters.LOW:
      return state.reviews.slice().sort((a, b) => {
        return a.score - b.score;
      });
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const ReviewList = () => {
  const items = useSelector((state: RootState) =>
    getVisibleReviews(state, state.visibilityFilter)
  );
  const dispatch = useDispatch();
  return (
    <ul>
      {items.map((review) => (
        <Review
          key={review.id}
          {...review}
          onClick={() => dispatch(toggle(review.id))}
        />
      ))}
    </ul>
  );
};

export default ReviewList;
