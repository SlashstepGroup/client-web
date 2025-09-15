import MenuList from "#components/MenuList/MenuList";
import MenuListLinkItem from "#components/menu-list-items/MenuListLinkItem/MenuListLinkItem";
import CloudIcon from "#components/icons/CloudIcon";
import ContractIcon from "#components/icons/ContractIcon";
import DashboardIcon from "#components/icons/DashboardIcon";
import HomeIcon from "#components/icons/HomeIcon";
import SettingsIcon from "#components/icons/SettingsIcon";
import ShieldIcon from "#components/icons/ShieldIcon";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GroupIcon from "#components/icons/GroupIcon";
import WorldIcon from "#components/icons/WorldIcon";

function InstanceHomePage({setHeaderTitle, setFallbackBackPathname}: {setHeaderTitle: (newHeaderTitle: string | null) => void, setFallbackBackPathname: (newPathname: string | null) => void}) {

  const navigate = useNavigate();
  const { instanceHostname } = useParams();

  useEffect(() => {

    document.title = "Home • Slashstep"

    setHeaderTitle(instanceHostname ?? "Unknown instance");
    setFallbackBackPathname("/instances");

  }, [instanceHostname, setHeaderTitle, setFallbackBackPathname]);

  useEffect(() => {

    if (window.screen.width > 400) {

      navigate(`/instances/${instanceHostname}/overview`, {replace: true});

    }

  }, [instanceHostname]);

  return (
    <section id="main-container">
      <main>
        <MenuList>
          <MenuListLinkItem icon={<CloudIcon />} link={`/instances/${instanceHostname}/overview`} label={"Overview"} />
          <MenuListLinkItem icon={<GroupIcon />} link={`/instances/${instanceHostname}/groups`} label={"Groups"} />
          <MenuListLinkItem icon={<WorldIcon />} link={`/instances/${instanceHostname}/workspaces`} label={"Workspaces"} />
        </MenuList>
        <MenuList>
          <MenuListLinkItem icon={<SettingsIcon />} link={`/instances/${instanceHostname}/settings`} label={"Client settings"} />
        </MenuList>
        <MenuList>
          <MenuListLinkItem icon={<ShieldIcon />} link={`/instances/${instanceHostname}/privacy-policy`} label={"Privacy policy"} />
          <MenuListLinkItem icon={<ContractIcon />} link={`/instances/${instanceHostname}/terms-of-service`} label={"Terms of service"} />
        </MenuList>
      </main>
    </section>
  );

}

export default React.memo(InstanceHomePage);