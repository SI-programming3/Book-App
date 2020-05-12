let nextReviewId = 0;
export const addReview = (
  title: string,
  score: number,
  review: string,
  date: Date
) => ({
  type: "ADD_REVIEW",
  id: nextReviewId++,
  title,
  score,
  review,
  date,
});

export const setVisibilityFilter = (filter: string) => ({
  type: "SET_VISIBILITY_FILTER",
  filter,
});

export const toggle = (id: number) => ({
  type: "TOGGLE",
  id,
});

export const VisibilityFilters = {
  NEW: "NEW",
  OLD: "OLD",
  HIGH: "HIGH",
  LOW: "LOW",
};
