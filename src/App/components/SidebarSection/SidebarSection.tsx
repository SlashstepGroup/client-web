import React, { ReactElement } from "react";
import { sidebarSection as sidebarSectionStyle } from "./SidebarSection.module.css";

function SidebarSection({name, children}: {name: string, children?: ReactNode}) {

  return (
    <section className={sidebarSectionStyle}>
      <h1>{name}</h1>
      {
        children ? (
          <ul>
            {children}
          </ul>
        ) : null
      }
    </section>
  );

}

export default React.memo(SidebarSection);