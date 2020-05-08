import React from "react";

const Posts: React.FC<{ posts: any[] }> = ({ posts }) => {
  return (
    <ul>
      {posts.map((post, i: number) => (
        <li key={i}>{post.title}</li>
      ))}
    </ul>
  );
};

export default Posts;

/*
subredditのタイトルの表示を箇条書きで出力している？
*/
