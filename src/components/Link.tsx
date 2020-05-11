import React from "react";
import { setVisibilityFilter } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";

const Link: React.FC<{ filter: string }> = ({ filter, children }) => {
  const active = useSelector(
    (state: RootState) => filter === state.visibilityFilter
  );
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(setVisibilityFilter(filter))}
      disabled={active}
      style={{
        marginLeft: "4px",
      }}
    >
      {children}
    </button>
  );
};

export default Link;

/*
onClickには() => dispatch(setVisibilityFilter(ownProps.filter))が入っている。
Allが押されている状態でActiveを押したとすると、onClickによってstateの更新が入り、
  FilterLink内のstate.visibilityFilterの中身が変わり、activeの真偽値が更新され、
  Allが押せるようになり、Activeが押せなくなる。
childrenは、FooterにてFilterLinkタグで囲った部分が入る。つまりこの場合、AllやActiveが入る。
nodeという形で定義されているので、タグで囲まれたやつとかでもchildrenとして渡すことができる。

ジェネリック型
React.FCとやると、childrenが使える。型定義不要。
*/
