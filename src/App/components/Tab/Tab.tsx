import React from "react";
import { Link } from "react-router-dom";
import { tab as tabStyle, selected as selectedStyle } from "./Tab.module.css";

export type WorkspaceProperties = {
  name: string;
  displayName: string;
  description?: string;
}

function Tab({children, link, isSelected}: {children: React.ReactNode, link: string, isSelected: boolean}) {

  return (
    <li className={`${tabStyle} ${isSelected ? selectedStyle : ""}`}>
      <Link to={link}>{children}</Link>
    </li>
  );

}

export default React.memo(Tab);