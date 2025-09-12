import React from "react";
import SidebarSection from "../SidebarSection/SidebarSection";
import SidebarItem from "../SidebarItem/SidebarItem";
import Sidebar from "../Sidebar/Sidebar";
import SettingsIcon from "#icons/SettingsIcon";
import CloudIcon from "#icons/CloudIcon";
import HomeIcon from "#icons/HomeIcon";

function HomeSidebar() {

  return (
    <Sidebar>
      <SidebarSection name="Home">
        <SidebarItem icon={<HomeIcon />} link={`/overview`}>Overview</SidebarItem>
        <SidebarItem icon={<CloudIcon />} link={`/instances`}>Instances</SidebarItem>
        <SidebarItem icon={<SettingsIcon />} link={`/settings`}>Client settings</SidebarItem>
      </SidebarSection>
    </Sidebar>
  );

}

export default React.memo(HomeSidebar);