import MenuList from "#components/MenuList/MenuList";
import MenuListLinkItem from "#components/MenuListLinkItem/MenuListLinkItem";
import CloudIcon from "#icons/CloudIcon";
import ContractIcon from "#icons/ContractIcon";
import DashboardIcon from "#icons/DashboardIcon";
import HomeIcon from "#icons/HomeIcon";
import SettingsIcon from "#icons/SettingsIcon";
import ShieldIcon from "#icons/ShieldIcon";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomePage({setHeaderTitle, setFallbackBackPathname}: {setHeaderTitle: (newHeaderTitle: string | null) => void, setFallbackBackPathname: (newPathname: string | null) => void}) {

  const navigate = useNavigate();

  useEffect(() => {

    document.title = "Home • Slashstep"

    setHeaderTitle("Home");
    setFallbackBackPathname(null);

  }, [setHeaderTitle, setFallbackBackPathname]);

  if (window.screen.width > 400) {

    navigate("/overview", {replace: true});
    return null;

  }

  return (
    <section id="main-container">
      <main>
        <MenuList>
          <MenuListLinkItem icon={<HomeIcon />} link={`/overview`} label={"Overview"} />
          <MenuListLinkItem icon={<CloudIcon />} link={`/instances`} label={"Instances"} />
          {/* <MenuListLinkItem icon={<DashboardIcon />} link={`/dashboards`} label={"Dashboards"} /> */}
        </MenuList>
        <MenuList>
          <MenuListLinkItem icon={<SettingsIcon />} link={`/settings`} label={"Client settings"} />
        </MenuList>
        <MenuList>
          <MenuListLinkItem icon={<ShieldIcon />} link={`/privacy-policy`} label={"Privacy policy"} />
          <MenuListLinkItem icon={<ContractIcon />} link={`/terms-of-service`} label={"Terms of service"} />
        </MenuList>
      </main>
    </section>
  );

}

export default React.memo(HomePage);