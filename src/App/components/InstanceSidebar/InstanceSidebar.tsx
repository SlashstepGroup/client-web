import React from "react";
import SidebarSection from "../SidebarSection/SidebarSection";
import SidebarItem from "../SidebarItem/SidebarItem";
import WorldIcon from "../icons/WorldIcon";
import Sidebar from "../Sidebar/Sidebar";
import SettingsIcon from "#components/icons/SettingsIcon";
import { matchPath, useLocation, useParams } from "react-router-dom";
import CloudIcon from "#components/icons/CloudIcon";
import GroupIcon from "#components/icons/GroupIcon";

function InstanceSidebar() {

  const location = useLocation();
  const params = matchPath("/instances/:instanceID/*", location.pathname)?.params;

  if (!params) return null;

  const { instanceID } = params;

  return (
    <Sidebar>
      <SidebarSection name="Instance">
        <SidebarItem icon={<CloudIcon />} link={`/instances/${instanceID}`}>Overview</SidebarItem>
        <SidebarItem icon={<GroupIcon />} link={`/instances/${instanceID}/groups`}>Groups</SidebarItem>
        <SidebarItem icon={<WorldIcon />} link={`/instances/${instanceID}/workspaces`}>Workspaces</SidebarItem>
        <SidebarItem icon={<SettingsIcon />} link={`/instances/${instanceID}/settings`}>Settings</SidebarItem>
      </SidebarSection>
    </Sidebar>
  );

}

export default React.memo(InstanceSidebar);