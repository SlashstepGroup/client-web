import React, { ReactNode } from "react";
import { sidebarItem as sidebarItemStyle } from "./SidebarItem.module.css";
import { Link } from "react-router-dom";

function SidebarItem({link, icon, children}: {link: string, icon: ReactNode, children: ReactNode}) {

  return (
    <li className={sidebarItemStyle}>
      <Link to={link}>
        {icon}
        {children}
      </Link>
    </li>
  );

}

export default React.memo(SidebarItem);