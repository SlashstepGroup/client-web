import React from "react";
import { list as listStyle } from "./MenuList.module.css";

function MenuList({children}: {children: React.ReactNode}) {

  return (
    <ul className={listStyle}>
      {children}
    </ul>
  );

}

export default React.memo(MenuList);