import React, { useEffect, useMemo } from "react";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import AboutIcon from "#icons/AboutIcon";
import SettingsIcon from "#icons/SettingsIcon";
import { useParams } from "react-router-dom";
import MenuList from "#components/MenuList/MenuList";
import MenuListDropdownItem from "#components/MenuListDropdownItem/MenuListDropdownItem";
import MenuListDisplayItem from "#components/MenuListDisplayItem/MenuListDisplayItem";
import { AccessPolicy, AccessPolicyInheritanceLevel, AccessPolicyPermissionLevel, Action, Client, Instance, User } from "@waltzgroup/javascript-sdk";
import InstanceBreadcrumb from "#components/InstanceBreadcrumb/InstanceBreadcrumb";
import KeyIcon from "#icons/KeyIcon";
import Spinner from "#components/Spinner/Spinner";
import AccessPolicyTableRow from "#components/AccessPolicyTableRow/AccessPolicyTableRow";
import MenuListUserAccessPoliciesDropdownItem from "#components/MenuListUserAccessPoliciesDropdownItem/MenuListUserAccessPoliciesDropdownItem";

function InstanceAccessPoliciesPage({instance, isLoadingResources}: {instance: Instance | null, isLoadingResources: boolean}) {

  const { instanceID } = useParams();
  const [shouldUpdateAccessPolicies, setShouldUpdateAccessPolicies] = React.useState(false);

  useEffect(() => {
  
    document.title = "Access policies • Slashstep";

  }, []);

  return (
    <section id="main-container">
      <BreadcrumbList>
        <InstanceBreadcrumb instance={instance} instanceID={instanceID!} isLoadingResources={isLoadingResources} />
        <Breadcrumb icon={<SettingsIcon />} link={`/instances/${instanceID}/settings`}>Settings</Breadcrumb>
        <Breadcrumb icon={<KeyIcon />} link={`/instances/${instanceID}/settings/access-policies`}>Access policies</Breadcrumb>
      </BreadcrumbList>
      <section className="toolbar">
        <button type="button" className="primary-button" disabled={shouldUpdateAccessPolicies} onClick={() => setShouldUpdateAccessPolicies(true)}>
          <span>Save</span>
          {shouldUpdateAccessPolicies ? <Spinner /> : null}
        </button>
        <button type="button" disabled={!shouldUpdateAccessPolicies} onClick={() => null}>Cancel</button>
      </section>
      <section id="scroll-container">
        <main>
          <h1>Access policies</h1>
          <p>Access policies define the permissions a principal has on a resource. User access policies take priority over role access policies. Workspaces may inherit instance access policies depending on their inheritance levels.</p>
          <section className="button-list">
            <button type="button" className="primary-button" disabled={shouldUpdateAccessPolicies}>Add principal</button>
          </section>
          <MenuList>
            <MenuListUserAccessPoliciesDropdownItem user={new User({
              id: "user1",
              username: "christian.toney",
              displayName: "Christian Toney"
            }, {} as Client)} />
          </MenuList>
        </main>
      </section>
    </section>
  );

}

export default React.memo(InstanceAccessPoliciesPage);