import React, { use, useEffect } from "react";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import MenuList from "#components/MenuList/MenuList";
import MenuListLinkItem from "#components/menu-list-items/MenuListLinkItem/MenuListLinkItem";
import SettingsIcon from "#components/icons/SettingsIcon";
import PersonIcon from "#components/icons/PersonIcon";
import KeyIcon from "#components/icons/KeyIcon";
import AboutIcon from "#components/icons/AboutIcon";
import GroupIcon from "#components/icons/GroupIcon";
import EncryptedIcon from "#components/icons/EncryptedIcon";
import { useParams } from "react-router-dom";
import { Instance } from "@slashstepgroup/javascript-sdk";
import Spinner from "#components/Spinner/Spinner";
import Tip from "#components/Tip/Tip";
import InstanceBreadcrumb from "#components/InstanceBreadcrumb/InstanceBreadcrumb";

export type HomeSettingsPageProperties = {
  setHeaderTitle: (newHeaderTitle: string | null) => void;
  setFallbackBackPathname: (newPathname: string | null) => void;
}

function HomeSettingsPage({setHeaderTitle, setFallbackBackPathname}: HomeSettingsPageProperties) {

  useEffect(() => {

    document.title = "Settings • Slashstep";

  }, []);

  return (
    <section id="main-container">
      <BreadcrumbList>
        <Breadcrumb icon={<SettingsIcon />} link="/settings">Settings</Breadcrumb>
      </BreadcrumbList>
      <main>
        <h1>Settings</h1>
        <MenuList>
          <MenuListLinkItem icon={<AboutIcon />} link={`/settings/about`} label={"About"} description={"Learn about your client and its capabilities."} />
        </MenuList>
      </main>
    </section>
  );

}

export default React.memo(HomeSettingsPage);