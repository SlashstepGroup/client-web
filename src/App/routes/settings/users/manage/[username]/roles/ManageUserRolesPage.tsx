import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import SettingsIcon from "#icons/SettingsIcon";
import { Client, Role, User } from "@waltzgroup/javascript-sdk";
import Spinner from "#components/Spinner/Spinner";
import PersonIcon from "#icons/PersonIcon";
import Tip from "#components/Tip/Tip";
import UserSettingsIcon from "#icons/UserSettingsIcon";
import KeyIcon from "#icons/KeyIcon";
import MenuList from "#components/MenuList/MenuList";
import MenuListUserAccessPoliciesDropdownItem from "#components/MenuListUserAccessPoliciesDropdownItem/MenuListUserAccessPoliciesDropdownItem";
import GroupIcon from "#icons/GroupIcon";
import RoleDropdown from "#components/RoleDropdown/RoleDropdown";
import UserRoleTableBodyRow from "#components/UserRoleTableBodyRow/UserRoleTableBodyRow";

function ManageUserRolesPage() {

  const { username } = useParams();
  const [user, setUser] = React.useState<User | null>(null);
  const [searchingForUser, setSearchingForUser] = useState(true);
  const [shouldUpdateRoles, setShouldUpdateRoles] = useState(false);
  const [isAddRoleDropdownOpen, setIsAddRoleDropdownOpen] = useState(false);
  const [selectedRoleIDs, setSelectedRoleIDs] = useState<string[]>([]);
  const [roles, setRoles] = useState<Role[] | null>(null);
  const [newRoles, setNewRoles] = useState<Role[] | null>(null);
  const areAllRolesSelected = roles ? selectedRoleIDs.length === roles.length : false;

  useEffect(() => {

    document.title = `Manage ${user?.displayName ?? username}'s permissions • Waltz`;

  }, [user]);

  useEffect(() => {

    // TODO: Get user from API
    setUser(new User({
      id: "123",
      username: "christian.toney",
      displayName: "Christian Toney"
    }, {} as Client));
    setSearchingForUser(false);

    // TODO: Get user roles from API
    setRoles([
      new Role({
        id: "123",
        name: "Instance admins",
        description: "People who can manage most instance resources and bypass most permission checks."
      }, {} as Client)
    ]);

  }, []);

  useEffect(() => {

    setNewRoles(roles);

  }, [roles]);

  const areNewRolesEqual = useMemo(() => {

    if (!newRoles || !roles) return false;
    if (roles.length !== newRoles.length) return false;

    for (const role of roles) {

      if (!newRoles.find((newRole) => newRole.id === role.id)) return false;

    }

    return true;

  }, [newRoles, roles]);

  useEffect(() => {

    if (!areNewRolesEqual) {

      const alertUnsavedChanges = (event: BeforeUnloadEvent) => event.preventDefault();

      window.addEventListener("beforeunload", alertUnsavedChanges);

      return () => window.removeEventListener("beforeunload", alertUnsavedChanges);

    }

  }, [areNewRolesEqual]);

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
          <Breadcrumb icon={<GroupIcon />} link={`/settings/users/manage/${username}/permissions`}>
            Roles
          </Breadcrumb>
        </BreadcrumbList>
        <section className="toolbar">
          <button type="button" className="primary-button" disabled={areNewRolesEqual || shouldUpdateRoles} onClick={() => setShouldUpdateRoles(true)}>
            <span>Save</span>
            {shouldUpdateRoles ? <Spinner /> : null}
          </button>
          <button type="button" disabled={areNewRolesEqual || shouldUpdateRoles} onClick={() => setNewRoles(roles)}>Cancel</button>
        </section>
        <main>
          {
            searchingForUser || !roles || !newRoles ? <Spinner /> : (
              user ? (
                <>
                  {/* <Tip type="Error">
                    {user.displayName} already has that role.
                  </Tip> */}
                  <h1>Manage {user.displayName}'s roles</h1>
                  <p>Use roles to give pre-defined permissions to this user. To directly define access policies for this user, use the <Link to={`/settings/access-policies/manage`}>access policies</Link> page.</p>
                  <Tip>This information is based on your current scope, which is the entire instance.</Tip>
                  <section className="button-list">
                    <RoleDropdown selectedItem={"Add role"} isOpen={isAddRoleDropdownOpen} onClick={() => setIsAddRoleDropdownOpen(!isAddRoleDropdownOpen)} onChange={(role) => {
                      
                      setNewRoles([...newRoles, role]);
                      setIsAddRoleDropdownOpen(false);
                    
                    }} isDisabled={shouldUpdateRoles} />
                    <button type="button" className="destructive-button" disabled={selectedRoleIDs.length === 0 || shouldUpdateRoles} onClick={() => {
                      
                      setNewRoles(newRoles.filter((role) => !selectedRoleIDs.includes(role.id)))
                      setSelectedRoleIDs([]);

                    }}>Remove selected roles</button>
                  </section>
                  {
                    newRoles ? (
                      newRoles.length > 0 ? (
                        <section className="table-container">
                          <table cellSpacing={0}>
                            <colgroup className="checkbox-colgroup" />
                            <colgroup />
                            <colgroup />
                            <colgroup />
                            <thead>
                              <tr>
                                <th scope="col" className="checkbox-cell">
                                  <section>
                                    <input type="checkbox" checked={areAllRolesSelected} onClick={() => setSelectedRoleIDs(areAllRolesSelected ? [] : roles.map((role) => role.id))} disabled={shouldUpdateRoles} />
                                  </section>
                                </th>
                                <th scope="col">Role name</th>
                                <th scope="col">Role description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                newRoles.map((role) => (
                                  <UserRoleTableBodyRow key={role.id} role={role} isSelected={selectedRoleIDs.includes(role.id)} onSelectionBoxClick={() => selectedRoleIDs.includes(user.id) ? setSelectedRoleIDs(selectedRoleIDs.filter((selectedRoleID) => selectedRoleID !== role.id)) : setSelectedRoleIDs([...selectedRoleIDs, user.id])} isSelectionDisabled={shouldUpdateRoles} />
                                ))
                              }
                            </tbody>
                          </table>
                        </section>
                      ) : (
                        <Tip>No roles to display.</Tip>
                      )
                    ) : (
                      <Spinner />
                    )
                  }
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