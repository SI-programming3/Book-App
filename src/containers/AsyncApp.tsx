import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit,
} from "../actions";
import Picker from "../components/Picker";
import Posts from "../components/Posts";

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }
  // .bind(this)でhandleCHangeなどのthisの参照先がAsyncAppクラスになる。

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }
  /* 
  render直後に行われる。
  dispatchやselectedSubredditにthis.propsのものが入る。
  同名ならdispatch=this.props.dispatch、
  別名ならdispatch={this.props.foo: fuga}のようになる？
  初回のデータフェッチ。
  */

  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }
  /*
  更新が起こった直後（componentのpropsやstateが更新された時）に行われる。
  selectSubredditが変更された時に実行される。
  やってることはDidMountと同じ。
  変更に応じて再フェッチする場合に必要なのがこっち。
  */

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit));
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={["reactjs", "frontend"]}
        />
        <p>
          {lastUpdated && (
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{" "}
            </span>
          )}
          {!isFetching && (
            <button onClick={this.handleRefreshClick}>Refresh</button>
          )}
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
  }
}
/*
render部分ではvalueにsubreddit、onChangeにhandleChange、optionsにreactjsかfrontend。
lastupdatedのところはrefreshボタンが押された時に、
  handleRefreshClick→fetchPostsIfNeeded→fetchPosts→receivePostsで時刻が更新される。
*/

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state;
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || {
    isFetching: true,
    items: [],
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(AsyncApp);
