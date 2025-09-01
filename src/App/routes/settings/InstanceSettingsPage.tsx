import React, { use, useEffect } from "react";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import MenuList from "#components/MenuList/MenuList";
import MenuListLinkItem from "#components/MenuListLinkItem/MenuListLinkItem";
import SettingsIcon from "#icons/SettingsIcon";
import PersonIcon from "#icons/PersonIcon";
import KeyIcon from "#icons/KeyIcon";
import AboutIcon from "#icons/AboutIcon";
import GroupIcon from "#icons/GroupIcon";
import EncryptedIcon from "#icons/EncryptedIcon";

function InstanceSettingsPage() {

  useEffect(() => {

    document.title = "Instance settings • Waltz";

  }, []);

  return (
    <section id="main-container">
      <BreadcrumbList>
        <Breadcrumb icon={<SettingsIcon />} link="/settings">
          Instance settings
        </Breadcrumb>
      </BreadcrumbList>
      <main>
        <h1>Instance settings</h1>
        <MenuList>
          <MenuListLinkItem icon={<KeyIcon />} link={`/settings/access-policies`} label={"Access policies"} description={"Manage access policies for your instance."} />
          <MenuListLinkItem icon={<EncryptedIcon />} link={`/settings/encryption`} label={"Encryption"} description={"Manage encryption settings for your instance."} />
          <MenuListLinkItem icon={<PersonIcon />} link={`/settings/users`} label={"Users"} description={"Create, manage, and delete users of your instance."} />
          <MenuListLinkItem icon={<GroupIcon />} link={`/settings/roles`} label={"Roles"} description={"Create, manage, and delete roles for your instance."} />
          <MenuListLinkItem icon={<AboutIcon />} link={`/settings/about`} label={"About"} description={"Learn about your instance and its capabilities."} />
        </MenuList>
      </main>
    </section>
  );

}

export default React.memo(InstanceSettingsPage);