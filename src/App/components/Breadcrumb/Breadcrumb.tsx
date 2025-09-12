import React, { ReactElement } from "react";
import { breadcrumb as breadcrumbStyle } from "./Breadcrumb.module.css";
import { Link } from "react-router-dom";

export type BreadcrumbProperties = {
  icon: ReactElement;
  link: string;
}

function Breadcrumb({icon, link, children}: BreadcrumbProperties & {children: ReactNode}) {

  return (
    <li className={breadcrumbStyle}>
      {icon}
      <Link to={link}>
        {children}
      </Link>
    </li>
  );

}

export default React.memo(Breadcrumb);