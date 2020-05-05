import "babel-polyfill";

import React from "react";
import { render } from "react-dom";
import Root from "./containers/Root";

render(<Root />, document.getElementById("root"));

/* 
Reddit：英語版の掲示板的なもの。2ch(5ch)的な？
subreddit：redditでは特定の領域向けに焦点を当てたコミュニティを
    サブレディット(subreddit)と呼ぶ。これは匿名掲示板2ちゃんねるなどにおける
    『板』に相当するものであるが、ユーザーが自主的に立ち上げることが可能である。
*/
