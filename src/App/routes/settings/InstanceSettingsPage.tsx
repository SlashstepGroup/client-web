import React, { use, useEffect } from "react";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import MenuList from "#components/MenuList/MenuList";
import MenuListLinkItem from "#components/MenuListLinkItem/MenuListLinkItem";
import SettingsIcon from "#icons/SettingsIcon";

function InstanceSettingsPage() {

  useEffect(() => {

    document.title = "Settings • Waltz";

  }, []);

  return (
    <section id="main-container">
      <BreadcrumbList>
        <Breadcrumb icon={<SettingsIcon />} link="/settings">
          Settings
        </Breadcrumb>
      </BreadcrumbList>
      <main>
        <h1>Settings</h1>
        <MenuList>
          <MenuListLinkItem link={`/settings/access-policies`} label={"Access policies"} description={"Manage access to your instance's resources."} />
          <MenuListLinkItem link={`/settings/users`} label={"Users"} description={"Create, manage, and delete users of your instance."} />
          <MenuListLinkItem link={`/settings/about`} label={"About"} description={"Learn about your instance and its capabilities."} />
        </MenuList>
      </main>
    </section>
  );

}

export default React.memo(InstanceSettingsPage);