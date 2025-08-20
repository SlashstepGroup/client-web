import React from "react";
import { list as listStyle } from "./MenuList.module.css";

function MenuList({children}: {children: React.ReactNode}) {

  return (
    <section>
      <ul className={listStyle}>
        {children}
      </ul>
    </section>
  );

}

export default React.memo(MenuList);