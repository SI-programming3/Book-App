import React from "react";
import Link from "./Link";
import { VisibilityFilters } from "../actions";

const Footer = () => (
  <div>
    <span>Show: </span>
    <Link filter={VisibilityFilters.NEW}>NEW</Link>
    <Link filter={VisibilityFilters.OLD}>OLD</Link>
  </div>
);

export default Footer;

/*
単にFilterLinkにfilterにVisibilityFiltersのプロパティの中身を代入しているだけ。
AllやActiveはここで出力しているわけではない。Link内で出力している。
*/
