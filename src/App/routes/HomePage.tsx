import MenuList from "#components/MenuList/MenuList";
import MenuListLinkItem from "#components/MenuListLinkItem/MenuListLinkItem";
import CloudIcon from "#icons/CloudIcon";
import DashboardIcon from "#icons/DashboardIcon";
import HomeIcon from "#icons/HomeIcon";
import SettingsIcon from "#icons/SettingsIcon";
import React, { useEffect } from "react";

function HomePage({setHeaderTitle, setFallbackBackPathname}: {setHeaderTitle: (newHeaderTitle: string | null) => void, setFallbackBackPathname: (newPathname: string | null) => void}) {

  useEffect(() => {

    document.title = "Home • Slashstep"

    setHeaderTitle("Home");
    setFallbackBackPathname(null);

  }, [setHeaderTitle, setFallbackBackPathname]);

  return (
    <section id="main-container">
      <main>
        <MenuList>
          <MenuListLinkItem icon={<HomeIcon />} link={`/overview`} label={"Overview"} />
          <MenuListLinkItem icon={<CloudIcon />} link={`/instances`} label={"Instances"} />
          <MenuListLinkItem icon={<DashboardIcon />} link={`/overview`} label={"Dashboards"} />
        </MenuList>
        <MenuList>
          <MenuListLinkItem icon={<SettingsIcon />} link={`/settings`} label={"Client settings"} />
        </MenuList>
      </main>
    </section>
  );

}

export default React.memo(HomePage);