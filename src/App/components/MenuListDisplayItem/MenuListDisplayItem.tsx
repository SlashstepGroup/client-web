import React from "react";
import { item as itemStyle } from "./MenuListDisplayItem.module.css";

function MenuListDisplayItem({children, ...props}: {children: React.ReactNode} & React.HTMLProps<HTMLLIElement>) {

  return (
    <li {...props} className={`${itemStyle}${props.className ? ` ${props.className}` : ""}`}>
      {children}
    </li>
  );

}

export default React.memo(MenuListDisplayItem);