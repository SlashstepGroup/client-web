import MenuList from "#components/MenuList/MenuList";
import MenuListLinkItem from "#components/menu-list-items/MenuListLinkItem/MenuListLinkItem";
import CloudIcon from "#components/icons/CloudIcon";
import ContractIcon from "#components/icons/ContractIcon";
import HomeIcon from "#components/icons/HomeIcon";
import SettingsIcon from "#components/icons/SettingsIcon";
import ShieldIcon from "#components/icons/ShieldIcon";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WorkIcon from "#components/icons/WorkIcon";

export type HomePageProperties = {
  setHeaderTitle: (newHeaderTitle: string | null) => void; 
  setFallbackBackPathname: (newPathname: string | null) => void;
}

function HomePage({setHeaderTitle, setFallbackBackPathname}: HomePageProperties) {

  const navigate = useNavigate();

  useEffect(() => {

    document.title = "Home • Slashstep"

    setHeaderTitle("Home");
    setFallbackBackPathname(null);

  }, [setHeaderTitle, setFallbackBackPathname]);

  useEffect(() => {

    if (window.innerWidth >= 400) {

      navigate("/instances", {replace: true});

    }

  }, []);

  return (
    <section id="main-container">
      <main>
        <MenuList>
          <MenuListLinkItem icon={<CloudIcon />} link={`/instances`} label={"Instances"} />
          <MenuListLinkItem icon={<WorkIcon />} link={`/items`} label={"Items"} />
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