import { combineReducers } from "redux";
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
} from "./actions";

function selectedSubreddit(
  state = "reactjs",
  action: { type: string; subreddit: string }
) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}
//selectSubredditがdispatchされた時に実行される。

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
  },
  action: { type: string; posts: any; receivedAt: number }
) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}
/*
引数のstateはstateに何も入っていなかった時に初期値として代入されるもの。
Object.assignでstateをコピーする。
連想配列の結合により、state内の同じkey名のものに対し更新がかかる。
  REQUEST_POSTSの場合、isFetchingがtrueに、didInvalidateがfalseになる。
  RECEIVE_POSTSの場合、それらの更新に加えlastUpdatedが追加される。
*/

function postsBySubreddit(
  state = {},
  action: { type: string; subreddit: string; posts: any; receivedAt: number }
) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action),
      });
    default:
      return state;
  }
}
/*
state[action.subreddit]にisFetchingやdidInvalidateなどを入れる関数？
subredditの中身がSUB1の場合、初めて呼び出し時点ではstate[action.subreddit]の中身は空。
  再びSUB1で呼び出された場合、その中の状態が更新される？
*/

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
});

export default rootReducer;
