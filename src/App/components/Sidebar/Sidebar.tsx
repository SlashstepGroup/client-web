import React from "react";
import { sidebar as sidebarStyle } from "./Sidebar.module.css";

function Sidebar({children}: {children?: React.ReactNode}) {

  return (
    <section id={sidebarStyle}>
      {children}
    </section>
  );

}

export default React.memo(Sidebar);