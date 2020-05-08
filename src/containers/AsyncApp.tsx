import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit,
} from "../actions";
import Picker from "../components/Picker";
import Posts from "../components/Posts";
import { RootState } from "../configureStore";

const AsyncApp = () => {
  const { selectedSubreddit, postsBySubreddit } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);
  /*
  useEffectは第１引数にコールバック関数、
  第２引数にそのコールバック関数が依存する値の配列を入れる
  */

  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || {
    isFetching: true,
    items: [],
  };

  const handleChange = (nextSubreddit: string) => {
    dispatch(selectSubreddit(nextSubreddit));
  };

  const handleRefreshClick = (ev: React.MouseEvent) => {
    ev.preventDefault();
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  };

  return (
    <div>
      <Picker
        value={selectedSubreddit}
        onChange={handleChange}
        options={["reactjs", "frontend"]}
      />
      <p>
        {lastUpdated && (
          <span>
            Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{" "}
          </span>
        )}
        {!isFetching && <button onClick={handleRefreshClick}>Refresh</button>}
      </p>
      {isFetching && posts.length === 0 && <h2>Loading...</h2>}
      {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
      {posts.length > 0 && (
        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
          <Posts posts={posts} />
        </div>
      )}
    </div>
  );
};

export default AsyncApp;
