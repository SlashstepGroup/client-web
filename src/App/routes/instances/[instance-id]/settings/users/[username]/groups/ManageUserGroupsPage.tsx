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
import GroupIcon from "#icons/GroupIcon";
import RoleDropdown from "#components/RoleDropdown/RoleDropdown";
import UserRoleTableBodyRow from "#components/UserRoleTableBodyRow/UserRoleTableBodyRow";
import CloudIcon from "#icons/CloudIcon";

function ManageUserGroupsPage() {

  const { username, instanceID } = useParams();
  const [user, setUser] = React.useState<User | null>(null);
  const [searchingForUser, setSearchingForUser] = useState(true);
  const [shouldUpdateGroups, setShouldUpdateGroups] = useState(false);
  const [isAddRoleDropdownOpen, setIsAddRoleDropdownOpen] = useState(false);
  const [selectedRoleIDs, setSelectedRoleIDs] = useState<string[]>([]);
  const [groups, setGroups] = useState<Role[] | null>(null);
  const [newGroups, setNewGroups] = useState<Role[] | null>(null);
  const areAllGroupsSelected = groups ? selectedRoleIDs.length === groups.length : false;

  useEffect(() => {

    document.title = `Manage ${user?.displayName ?? username}'s permissions • Slashstep`;

  }, [user]);

  useEffect(() => {

    // TODO: Get user from API
    setUser(new User({
      id: "123",
      username: "christian.toney",
      displayName: "Christian Toney"
    }, {} as Client));
    setSearchingForUser(false);

    // TODO: Get user groups from API
    setGroups([
      new Role({
        id: "123",
        name: "Instance admins",
        description: "People who can manage most instance resources and bypass most permission checks."
      }, {} as Client)
    ]);

  }, []);

  useEffect(() => {

    setNewGroups(groups);

  }, [groups]);

  const areNewGroupsEqual = useMemo(() => {

    if (!newGroups || !groups) return false;
    if (groups.length !== newGroups.length) return false;

    for (const role of groups) {

      if (!newGroups.find((newRole) => newRole.id === role.id)) return false;

    }

    return true;

  }, [newGroups, groups]);

  useEffect(() => {

    if (!areNewGroupsEqual) {

      const alertUnsavedChanges = (event: BeforeUnloadEvent) => event.preventDefault();

      window.addEventListener("beforeunload", alertUnsavedChanges);

      return () => window.removeEventListener("beforeunload", alertUnsavedChanges);

    }

  }, [areNewGroupsEqual]);

  return (
    <>
      <section id="main-container">
        <BreadcrumbList>
          <Breadcrumb icon={<CloudIcon />} link={`/instances/${instanceID}`}>Beastslash</Breadcrumb>
          <Breadcrumb icon={<SettingsIcon />} link="/settings">
            Settings
          </Breadcrumb>
          <Breadcrumb icon={<PersonIcon />} link="/settings/users">
            Users
          </Breadcrumb>
          <Breadcrumb icon={<UserSettingsIcon />} link={`/instances/${instanceID}/settings/users/manage/${username}`}>
            Manage {user ? (user.displayName ?? user.username) : username}
          </Breadcrumb>
          <Breadcrumb icon={<GroupIcon />} link={`/instances/${instanceID}/settings/users/manage/${username}/permissions`}>
            Groups
          </Breadcrumb>
        </BreadcrumbList>
        <section className="toolbar">
          <button type="button" className="primary-button" disabled={!groups || !newGroups || areNewGroupsEqual || shouldUpdateGroups} onClick={() => setShouldUpdateGroups(true)}>
            <span>Save</span>
            {shouldUpdateGroups ? <Spinner /> : null}
          </button>
          <button type="button" disabled={!groups || !newGroups || areNewGroupsEqual || shouldUpdateGroups} onClick={() => setNewGroups(groups)}>Cancel</button>
        </section>
        <main>
          {
            searchingForUser || !groups || !newGroups ? <Spinner /> : (
              user ? (
                <>
                  {/* <Tip type="Error">
                    {user.displayName} already has that role.
                  </Tip> */}
                  <h1>Manage {user.displayName}'s groups</h1>
                  <p>Use groups to give pre-defined permissions to this user. To directly define access policies for this user, use the <Link to={`/instances/${instanceID}/settings/access-policies/manage`}>access policies</Link> page.</p>
                  <Tip>This information is based on your current scope, which is the entire instance.</Tip>
                  <section className="button-list">
                    <RoleDropdown selectedItem={"Add role"} isOpen={isAddRoleDropdownOpen} onClick={() => setIsAddRoleDropdownOpen(!isAddRoleDropdownOpen)} onChange={(role) => {
                      
                      setNewGroups([...newGroups, role]);
                      setIsAddRoleDropdownOpen(false);
                    
                    }} isDisabled={shouldUpdateGroups} />
                    <button type="button" className="destructive-button" disabled={selectedRoleIDs.length === 0 || shouldUpdateGroups} onClick={() => {
                      
                      setNewGroups(newGroups.filter((role) => !selectedRoleIDs.includes(role.id)))
                      setSelectedRoleIDs([]);

                    }}>Remove selected groups</button>
                  </section>
                  {
                    newGroups ? (
                      newGroups.length > 0 ? (
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
                                    <input type="checkbox" checked={areAllGroupsSelected} onClick={() => setSelectedRoleIDs(areAllGroupsSelected ? [] : groups.map((role) => role.id))} disabled={shouldUpdateGroups} />
                                  </section>
                                </th>
                                <th scope="col">Role name</th>
                                <th scope="col">Role description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                newGroups.map((role) => (
                                  <UserRoleTableBodyRow key={role.id} role={role} isSelected={selectedRoleIDs.includes(role.id)} onSelectionBoxClick={() => selectedRoleIDs.includes(user.id) ? setSelectedRoleIDs(selectedRoleIDs.filter((selectedRoleID) => selectedRoleID !== role.id)) : setSelectedRoleIDs([...selectedRoleIDs, user.id])} isSelectionDisabled={shouldUpdateGroups} />
                                ))
                              }
                            </tbody>
                          </table>
                        </section>
                      ) : (
                        <Tip>No groups to display.</Tip>
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

export default React.memo(ManageUserGroupsPage);