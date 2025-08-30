import React from "react";
import { item as itemStyle } from "./MenuListActionItem.module.css";

function MenuListActionItem({children, ...props}: {children: React.ReactNode} & React.HTMLProps<HTMLLIElement>) {

  return (
    <li {...props} className={`${itemStyle}${props.className ? ` ${props.className}` : ""}`}>
      {children}
    </li>
  );

}

export default React.memo(MenuListActionItem);