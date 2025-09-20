import React from "react";
import SidebarSection from "#components/SidebarSection/SidebarSection";
import SidebarItem from "#components/SidebarItem/SidebarItem";
import Sidebar from "#components/sidebars/Sidebar/Sidebar";
import SettingsIcon from "#icons/SettingsIcon";
import CloudIcon from "#icons/CloudIcon";
import HomeIcon from "#icons/HomeIcon";
import ShieldIcon from "#icons/ShieldIcon";
import ContractIcon from "#icons/ContractIcon";
import WorkIcon from "#icons/WorkIcon";

function HomeSidebar() {

  return (
    <Sidebar>
      <SidebarSection name="Home">
        <SidebarItem icon={<HomeIcon />} link={`/overview`}>Overview</SidebarItem>
        <SidebarItem icon={<CloudIcon />} link={`/instances`}>Instances</SidebarItem>
        <SidebarItem icon={<WorkIcon />} link={`/items`}>Items</SidebarItem>
        <SidebarItem icon={<SettingsIcon />} link={`/settings`}>Settings</SidebarItem>
      </SidebarSection>
      <SidebarSection name="Disclosures">
        <SidebarItem icon={<ShieldIcon />} link={`/privacy-policy`}>Privacy policy</SidebarItem>
        <SidebarItem icon={<ContractIcon />} link={`/terms-of-service`}>Terms of service</SidebarItem>
      </SidebarSection>
    </Sidebar>
  );

}

export default React.memo(HomeSidebar);