import React from "react";
import Link from "./Link";
import { VisibilityFilters } from "../actions";

const Footer = () => (
  <div>
    <span>Show: </span>
    <Link filter={VisibilityFilters.SHOW_ALL}>All</Link>
    <Link filter={VisibilityFilters.SHOW_ACTIVE}>Active</Link>
    <Link filter={VisibilityFilters.SHOW_COMPLETED}>Completed</Link>
  </div>
);

export default Footer;

/*
単にFilterLinkにfilterにVisibilityFiltersのプロパティの中身を代入しているだけ。
AllやActiveはここで出力しているわけではない。Link内で出力している。
*/
