import fetch from "cross-fetch";
import { RootState } from "./configureStore";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
//ほとんどのブラウザはFetch APIをサポートしていないのでimportする。

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";
export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";

//同期のAction Creator
//---------------------------------------------------------------------------
export function selectSubreddit(subreddit: string) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit,
  };
}
// subredditとして受け取った引数にtypeとsubredditの形で返す。

export function invalidateSubreddit(subreddit: string) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
}
// subredditはリフレッシュボタンで更新することができる。

function requestPosts(subreddit: string) {
  return {
    type: REQUEST_POSTS,
    subreddit,
  };
}
/*
subredditの投稿をフェッチ（読み出し？）する。リクエストを送った時の関数。
ユーザーのアクションと独立してデータをフェッチする必要が出てくるから、
  selectとinvalidateから独立して定義する必要がある。
*/

function receivePosts(subreddit: string, json: any) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map((child: any) => child.data),
    receivedAt: Date.now(),
  };
}
/*
ネットワークのリクエストが通ってレスが返ってきたらdispatchされる。
jsonデータを見てみるとjson.data.childrenの中にdataがあったので、それをpostsに渡す。

*/
//---------------------------------------------------------------------------

//非同期のAction Creator
function fetchPosts(subreddit: string) {
  return (dispatch = useDispatch()) => {
    dispatch(requestPosts(subreddit));
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then((response) => response.json())
      .then((json) => dispatch(receivePosts(subreddit, json)));
  };
}
/*
fetch()の結果がPromiseオブジェクトとして返ってきて、
  このPromiseの結果は Response オブジェクトで、 
  response.json()でリクエストの結果を文字列で解決されたPromiseを得ることができる
そして再びthenを使ってアクセスしている？
json形式のデータはオブジェクトの形。（{'id': num, 'name': 'hoge'}的な）

サンクミドルウェアは、関数の処理方法を知っています。
関数の引数としてdispatchメソッドを渡します。
したがって、アクション自体をdispatchできるようになります.

最初のdispatchでアプリの状態が更新され、API呼び出しが開始されていることが通知されます。

サンクミドルウェアによって呼び出された関数は、
  dispatchメソッドの戻り値として渡される値を返すことができます。
この場合、待機するという約束を返します。
これはサンクミドルウェアでは必要ありませんが、私たちにとっては便利です。

(jsonのところ)
何回でもdispatchできる。
ここでは、API呼び出しの結果でアプリの状態を更新します。
*/

function shouldFetchPosts(state: RootState, subreddit: string) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}
/*
state.postsBySubreddit[subreddit]でpostsBySubredditで更新されたstate内の
  state[subreddit]の中身がpostsに入る？
postsの中身がなければtrue、isFetchingがtrueならfalseを、
  どれにも該当しなければposts.didInvalidateを返す。どれもboolean型である。
*/

export function fetchPostsIfNeeded(subreddit: string) {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  };
}
/*
この関数はgetState()も受け取る。これにより、次に何をdispatchするか選択できる。
これは、キャッシュされた値がすでに使用可能な場合にネットワーク要求を回避するのに役立ちます。
thunkからthunkをdispatchできる。
待つ必要がないことを呼び出し側のコードへ知らせる。
*/
