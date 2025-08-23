import React from "react";
import { useNavigate } from "react-router-dom";
import Tip from "../../components/Tip/Tip";
import BreadcrumbList from "../../components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import WorldIcon from "../../icons/WorldIcon";
import MenuList from "../../components/MenuList/MenuList";
import MenuListLinkItem from "../../components/MenuListLinkItem/MenuListLinkItem";
import KeyIcon from "../../icons/KeyIcon";

function InstanceSettingsPage() {

  const navigate = useNavigate();

  return (
    <>
      <section id="main-container">
        <BreadcrumbList>
          <Breadcrumb icon={<KeyIcon />} link="/settings">
            Settings
          </Breadcrumb>
        </BreadcrumbList>
        <main>
          <h1>Settings</h1>
          <MenuList>
            <MenuListLinkItem link={`/settings/access`} label={"Access"} description={"Manage access to your instance's resources."} />
            <MenuListLinkItem link={`/settings/users`} label={"Users"} description={"Create, manage, and delete users of your instance."} />
            <MenuListLinkItem link={`/settings/about`} label={"About"} description={"Learn about your instance and its capabilities."} />
          </MenuList>
        </main>
      </section>
    </>
  );

}

export default React.memo(InstanceSettingsPage);