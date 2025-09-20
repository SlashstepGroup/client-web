import React from "react";
import SidebarSection from "../SidebarSection/SidebarSection";
import SidebarItem from "../SidebarItem/SidebarItem";
import WorldIcon from "../icons/WorldIcon";
import ActivityIcon from "../icons/ActivityIcon";
import ClipboardIcon from "../icons/ClipboardIcon";
import Sidebar from "../sidebars/Sidebar/Sidebar";
import KeyIcon from "../icons/KeyIcon";

function WorkspaceSidebar() {

  return (
    <Sidebar>
      <SidebarSection name="Workspace">
        <SidebarItem icon={<WorldIcon />} link="/workspaces/everyone-destroys-the-world">Overview</SidebarItem>
        <SidebarItem icon={<ActivityIcon />} link="/workspaces/everyone-destroys-the-world/activity">Activity</SidebarItem>
        <SidebarItem icon={<ClipboardIcon />} link="/workspaces/everyone-destroys-the-world/projects">Projects</SidebarItem>
        <SidebarItem icon={<KeyIcon />} link="/workspaces/everyone-destroys-the-world/settings">Settings</SidebarItem>
      </SidebarSection>
    </Sidebar>
  );

}

export default React.memo(WorkspaceSidebar);