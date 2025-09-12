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
import { useParams } from "react-router-dom";
import { Instance } from "@waltzgroup/javascript-sdk";
import Spinner from "#components/Spinner/Spinner";
import Tip from "#components/Tip/Tip";
import InstanceBreadcrumb from "#components/InstanceBreadcrumb/InstanceBreadcrumb";

function InstanceSettingsPage({instance, isLoadingResources}: {instance: Instance | null, isLoadingResources: boolean}) {

  useEffect(() => {

    document.title = "Instance settings • Slashstep";

  }, []);

  const { instanceID } = useParams();

  return (
    <section id="main-container">
      <BreadcrumbList>
        <InstanceBreadcrumb instance={instance} instanceID={instanceID!} isLoadingResources={isLoadingResources} />
        <Breadcrumb icon={<SettingsIcon />} link={`/instances/${instanceID}/settings`}>Settings</Breadcrumb>
      </BreadcrumbList>
      <main>
        <h1>Instance settings</h1>
        {
          isLoadingResources ? <Spinner /> : (
            instance ? (
              <MenuList>
                <MenuListLinkItem icon={<KeyIcon />} link={`/instances/${instanceID}/settings/access-policies`} label={"Access policies"} description={"Manage access policies for your instance."} />
                <MenuListLinkItem icon={<EncryptedIcon />} link={`/instances/${instanceID}/settings/encryption`} label={"Encryption"} description={"Manage encryption settings for your instance."} />
                <MenuListLinkItem icon={<PersonIcon />} link={`/instances/${instanceID}/settings/users`} label={"Users"} description={"Create, manage, and delete users of your instance."} />
                <MenuListLinkItem icon={<AboutIcon />} link={`/instances/${instanceID}/settings/about`} label={"About"} description={"Learn about your instance and its capabilities."} />
              </MenuList>
            ) : <Tip>Couldn't find that instance.</Tip>
          )
        }
        
      </main>
    </section>
  );

}

export default React.memo(InstanceSettingsPage);