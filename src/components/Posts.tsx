import React, { Component } from "react";

export default class Posts extends Component {
  render() {
    return (
      <ul>
        {this.props.posts.map((post, i: number) => (
          <li key={i}>{post.title}</li>
        ))}
      </ul>
    );
  }
}

/*
subredditのタイトルの表示を箇条書きで出力している？
*/
