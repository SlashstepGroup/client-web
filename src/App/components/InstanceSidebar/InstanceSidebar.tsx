import React from "react";
import SidebarSection from "../SidebarSection/SidebarSection";
import SidebarItem from "../SidebarItem/SidebarItem";
import WorldIcon from "../../icons/WorldIcon";
import Sidebar from "../Sidebar/Sidebar";
import HomeIcon from "../../icons/HomeIcon";
import SettingsIcon from "#icons/SettingsIcon";

function InstanceSidebar() {

  return (
    <Sidebar>
      <SidebarSection name="Instance">
        <SidebarItem icon={<HomeIcon />} link="/">Overview</SidebarItem>
        <SidebarItem icon={<WorldIcon />} link="/workspaces">Workspaces</SidebarItem>
        <SidebarItem icon={<SettingsIcon />} link="/settings">Settings</SidebarItem>
      </SidebarSection>
    </Sidebar>
  );

}

export default React.memo(InstanceSidebar);