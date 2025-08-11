import React from "react";
import SidebarSection from "../SidebarSection/SidebarSection";
import SidebarItem from "../SidebarItem/SidebarItem";
import WorldIcon from "../../icons/WorldIcon";
import ActivityIcon from "../../icons/ActivityIcon";
import BadgeIcon from "../../icons/BadgeIcon";
import GroupIcon from "../../icons/GroupIcon";
import ClipboardIcon from "../../icons/ClipboardIcon";
import Sidebar from "../Sidebar/Sidebar";
import WorkIcon from "../../icons/WorkIcon";

function WorkspaceSidebar() {

  return (
    <Sidebar>
      <SidebarSection name="Workspace">
        <SidebarItem icon={<WorldIcon />} link="/workspaces/everyone-destroys-the-world">Overview</SidebarItem>
        <SidebarItem icon={<ActivityIcon />} link="/workspaces/everyone-destroys-the-world/activity">Activity</SidebarItem>
        <SidebarItem icon={<WorkIcon />} link="/workspaces/everyone-destroys-the-world/items">Items</SidebarItem>
        <SidebarItem icon={<WorkIcon />} link="/workspaces/everyone-destroys-the-world/fields">Fields</SidebarItem>
        <SidebarItem icon={<BadgeIcon />} link="/workspaces/everyone-destroys-the-world/members">Members</SidebarItem>
        <SidebarItem icon={<GroupIcon />} link="/workspaces/everyone-destroys-the-world/groups">Groups</SidebarItem>
        <SidebarItem icon={<ClipboardIcon />} link="/workspaces/everyone-destroys-the-world/projects">Projects</SidebarItem>
      </SidebarSection>
      <SidebarSection name="Projects">
        <SidebarItem icon={<ClipboardIcon />} link="/workspaces/everyone-destroys-the-world/projects/story">Story</SidebarItem>
        <SidebarItem icon={<ClipboardIcon />} link="/workspaces/everyone-destroys-the-world/projects/design">Design</SidebarItem>
        <SidebarItem icon={<ClipboardIcon />} link="/workspaces/everyone-destroys-the-world/projects/turf-war">Turf War</SidebarItem>
        <SidebarItem icon={<ClipboardIcon />} link="/workspaces/everyone-destroys-the-world/projects/stage-maker">Stage Maker</SidebarItem>
      </SidebarSection>
    </Sidebar>
  );

}

export default React.memo(WorkspaceSidebar);