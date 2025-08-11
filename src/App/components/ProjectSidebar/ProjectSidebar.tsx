import React from "react";
import SidebarSection from "../SidebarSection/SidebarSection";
import SidebarItem from "../SidebarItem/SidebarItem";
import ActivityIcon from "../../icons/ActivityIcon";
import BadgeIcon from "../../icons/BadgeIcon";
import ClipboardIcon from "../../icons/ClipboardIcon";
import Sidebar from "../Sidebar/Sidebar";
import FlagIcon from "../../icons/FlagIcon";
import ListIcon from "../../icons/ListIcon";

function WorkspaceSidebar() {

  return (
    <Sidebar>
      <SidebarSection name="Project">
        <SidebarItem icon={<ClipboardIcon />} link="/workspaces/everyone-destroys-the-world/projects/story">Overview</SidebarItem>
        <SidebarItem icon={<ActivityIcon />} link="/workspaces/everyone-destroys-the-world/projects/story/activity">Activity</SidebarItem>
        <SidebarItem icon={<ListIcon />} link="/workspaces/everyone-destroys-the-world/projects/story/board">Board</SidebarItem>
        <SidebarItem icon={<BadgeIcon />} link="/workspaces/everyone-destroys-the-world/projects/story/members">Members</SidebarItem>
        <SidebarItem icon={<BadgeIcon />} link="/workspaces/everyone-destroys-the-world/projects/story/roles">Roles</SidebarItem>
        <SidebarItem icon={<FlagIcon />} link="/workspaces/everyone-destroys-the-world/projects/story/milestones">Milestones</SidebarItem>
      </SidebarSection>
    </Sidebar>
  );

}

export default React.memo(WorkspaceSidebar);