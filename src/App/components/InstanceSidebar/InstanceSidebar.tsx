import React from "react";
import SidebarSection from "../SidebarSection/SidebarSection";
import SidebarItem from "../SidebarItem/SidebarItem";
import WorldIcon from "../../icons/WorldIcon";
import Sidebar from "../Sidebar/Sidebar";
import HomeIcon from "../../icons/HomeIcon";
import BadgeIcon from "../../icons/BadgeIcon";
import GroupIcon from "../../icons/GroupIcon";
import KeyIcon from "../../icons/KeyIcon";

function InstanceSidebar() {

  return (
    <Sidebar>
      <SidebarSection name="Instance">
        <SidebarItem icon={<HomeIcon />} link="">Overview</SidebarItem>
        <SidebarItem icon={<WorldIcon />} link="/workspaces">Workspaces</SidebarItem>
        <SidebarItem icon={<KeyIcon />} link="/access">Access</SidebarItem>
        <SidebarItem icon={<BadgeIcon />} link="/users">Users</SidebarItem>
        <SidebarItem icon={<GroupIcon />} link="/groups">Groups</SidebarItem>
        <SidebarItem icon={<BadgeIcon />} link="/users">Fields</SidebarItem>
      </SidebarSection>
    </Sidebar>
  );

}

export default React.memo(InstanceSidebar);