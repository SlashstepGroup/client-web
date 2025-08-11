import React from "react";
import { sidebarItem as sidebarItemStyle } from "./SidebarItem.module.css";
import { Link } from "react-router-dom";

function SidebarItem({link, children}: {link: string, children: React.ReactNode}) {

  return (
    <li className={sidebarItemStyle}>
      <Link to={link}>{children}</Link>
    </li>
  );

}

export default React.memo(SidebarItem);