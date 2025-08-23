import React, { ReactNode } from "react";
import { sidebarItem as sidebarItemStyle, selected as selectedStyle } from "./SidebarItem.module.css";
import { Link, useLocation } from "react-router-dom";

function SidebarItem({link, icon, children}: {link: string, icon: ReactNode, children: ReactNode}) {

  const location = useLocation();

  return (
    <li className={`${sidebarItemStyle} ${location.pathname === link ? selectedStyle : ""}`}>
      <Link to={link}>
        {icon}
        {children}
      </Link>
    </li>
  );

}

export default React.memo(SidebarItem);