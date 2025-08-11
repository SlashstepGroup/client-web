import React, { ReactElement } from "react";
import { sidebar as sidebarStyle } from "./Sidebar.module.css";
import SidebarSection from "./components/SidebarSection/SidebarSection";
import SidebarItem from "./components/SidebarItem/SidebarItem";

function Sidebar() {

  return (
    <section id={sidebarStyle}>
      <SidebarSection name="Workspace">
        <SidebarItem link="/workspaces/everyone-destroys-the-world">Overview</SidebarItem>
        <SidebarItem link="/workspaces/everyone-destroys-the-world/activity">Activity</SidebarItem>
        <SidebarItem link="/workspaces/everyone-destroys-the-world/members">Members</SidebarItem>
        <SidebarItem link="/workspaces/everyone-destroys-the-world/settings">Settings</SidebarItem>
      </SidebarSection>
      <SidebarSection name="Projects">
        
      </SidebarSection>
    </section>
  );

}

export default React.memo(Sidebar);