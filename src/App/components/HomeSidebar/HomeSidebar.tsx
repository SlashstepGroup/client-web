import React from "react";
import SidebarSection from "../SidebarSection/SidebarSection";
import SidebarItem from "../SidebarItem/SidebarItem";
import Sidebar from "../Sidebar/Sidebar";
import SettingsIcon from "#components/icons/SettingsIcon";
import CloudIcon from "#components/icons/CloudIcon";
import HomeIcon from "#components/icons/HomeIcon";
import ShieldIcon from "#components/icons/ShieldIcon";
import ContractIcon from "#components/icons/ContractIcon";

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