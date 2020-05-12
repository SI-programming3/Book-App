import React from "react";
import Link from "./Link";
import { VisibilityFilters } from "../actions";

const Footer = () => (
  <div>
    <span>ソート: </span>
    <Link filter={VisibilityFilters.NEW}>NEW</Link>
    <Link filter={VisibilityFilters.OLD}>OLD</Link>
    <Link filter={VisibilityFilters.HIGH}>HIGH</Link>
    <Link filter={VisibilityFilters.LOW}>LOW</Link>
  </div>
);

export default Footer;
