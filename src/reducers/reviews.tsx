export type Reviews = {
  show: boolean;
  id: number;
  title: string;
  score: number;
  review: string;
  date: Date;
};

type ReviewsState = Reviews[];

const reviews = (
  state: ReviewsState = [],
  action: Reviews & { type: string }
) => {
  switch (action.type) {
    case "ADD_REVIEW":
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          score: action.score,
          review: action.review,
          date: action.date,
          show: false,
        },
      ];
    case "TOGGLE":
      return state.map((review) =>
        review.id === action.id ? { ...review, show: !review.show } : review
      );
    default:
      return state;
  }
};

export default reviews;
