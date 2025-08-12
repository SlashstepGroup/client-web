import React from "react";
import { tabList as tabListStyle } from "./TabList.module.css";

export type WorkspaceProperties = {
  name: string;
  displayName: string;
  description?: string;
}

function TabList({children}: {children: React.ReactNode}) {

  return (
    <nav className={tabListStyle}>
      <ul>
        {children}
      </ul>
    </nav>
  );

}

export default React.memo(TabList);