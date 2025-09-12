import React from "react";
import SidebarSection from "../SidebarSection/SidebarSection";
import SidebarItem from "../SidebarItem/SidebarItem";
import Sidebar from "../Sidebar/Sidebar";
import SettingsIcon from "#icons/SettingsIcon";
import CloudIcon from "#icons/CloudIcon";
import HomeIcon from "#icons/HomeIcon";
import ShieldIcon from "#icons/ShieldIcon";
import ContractIcon from "#icons/ContractIcon";

function HomeSidebar() {

  return (
    <Sidebar>
      <SidebarSection name="Home">
        <SidebarItem icon={<HomeIcon />} link={`/overview`}>Overview</SidebarItem>
        <SidebarItem icon={<CloudIcon />} link={`/instances`}>Instances</SidebarItem>
        <SidebarItem icon={<SettingsIcon />} link={`/settings`}>Client settings</SidebarItem>
      </SidebarSection>
      <SidebarSection name="Disclosures">
        <SidebarItem icon={<ShieldIcon />} link={`/privacy-policy`}>Privacy policy</SidebarItem>
        <SidebarItem icon={<ContractIcon />} link={`/terms-of-service`}>Terms of service</SidebarItem>
      </SidebarSection>
    </Sidebar>
  );

}

export default React.memo(HomeSidebar);