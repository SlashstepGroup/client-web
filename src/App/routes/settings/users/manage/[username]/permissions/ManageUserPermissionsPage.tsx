import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import SettingsIcon from "#icons/SettingsIcon";
import { Client, User } from "@waltzgroup/javascript-sdk";
import Spinner from "#components/Spinner/Spinner";
import PersonIcon from "#icons/PersonIcon";
import Tip from "#components/Tip/Tip";
import UserSettingsIcon from "#icons/UserSettingsIcon";
import KeyIcon from "#icons/KeyIcon";
import MenuList from "#components/MenuList/MenuList";
import MenuListRoleDropdownItem from "#components/MenuListRoleDropdownItem/MenuListRoleDropdownItem";
import MenuListUserAccessPoliciesDropdownItem from "#components/MenuListUserAccessPoliciesDropdownItem/MenuListUserAccessPoliciesDropdownItem";

function ManageUserRolesPage() {

  const { username } = useParams();
  const [user, setUser] = React.useState<User | null>(null);
  const [searchingForUser, setSearchingForUser] = useState(true);

  useEffect(() => {

    document.title = "Manage user permissions • Waltz";

  }, [user]);

  useEffect(() => {

    // TODO: Get user from API
    setUser(new User({
      id: "123",
      username: "christian.toney",
      displayName: "Christian Toney"
    }, {} as Client));
    setSearchingForUser(false);

  }, []);

  return (
    <>
      <section id="main-container">
        <BreadcrumbList>
          <Breadcrumb icon={<SettingsIcon />} link="/settings">
            Settings
          </Breadcrumb>
          <Breadcrumb icon={<PersonIcon />} link="/settings/users">
            Users
          </Breadcrumb>
          <Breadcrumb icon={<UserSettingsIcon />} link={`/settings/users/manage/${username}`}>
            Manage {user ? (user.displayName ?? user.username) : username}
          </Breadcrumb>
          <Breadcrumb icon={<KeyIcon />} link={`/settings/users/manage/${username}/permissions`}>
            Permissions
          </Breadcrumb>
        </BreadcrumbList>
        <main>
          {
            searchingForUser ? <Spinner /> : (
              user ? (
                <>
                  <h1>Manage {user.displayName}'s permissions</h1>
                  <Tip>This information is based on your current scope, which is the entire instance.</Tip>
                  <MenuList>
                    <MenuListRoleDropdownItem user={user} />
                    <MenuListUserAccessPoliciesDropdownItem user={user} />
                  </MenuList>
                </>
              ) : (
                <Tip type="Warning">User not found. Maybe that user was deleted, or the URL you came from may be incorrect.</Tip>
              )
            )
          }
        </main>
      </section>
    </>
  );

}

export default React.memo(ManageUserRolesPage);