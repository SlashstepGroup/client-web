import React, { Fragment, ReactNode } from "react";
import { breadcrumbList as breadcrumbListStyle } from "./BreadcrumbList.module.css";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import HomeIcon from "../../icons/HomeIcon";

function Separator() {

  return (
    <li>
      <span>/</span>
    </li>
  );

}

function BreadcrumbList({children}: {children?: ReactNode}) {
  
  return (
    <nav id={breadcrumbListStyle} className="toolbar">
      <ul>
        <Breadcrumb icon={<HomeIcon />} link="/">
          Home
        </Breadcrumb>
        {React.Children.count(children) > 0 ? <Separator /> : null}
        {React.Children.map(children, (child, index) => (
          <Fragment key={index}>
            {child}
            {index < React.Children.count(children) - 1 ? <Separator /> : null}
          </Fragment>
        ))}
      </ul>
    </nav>
  );

}

export default React.memo(BreadcrumbList);