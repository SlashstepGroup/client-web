import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import SettingsIcon from "#icons/SettingsIcon";
import { Client, Role, User } from "@waltzgroup/javascript-sdk";
import Spinner from "#components/Spinner/Spinner";
import PersonIcon from "#icons/PersonIcon";
import Tip from "#components/Tip/Tip";
import UserSettingsIcon from "#icons/UserSettingsIcon";
import KeyIcon from "#icons/KeyIcon";
import UserRoleTableBodyRow from "#components/UserRoleTableBodyRow/UserRoleTableBodyRow";
import Dropdown from "#components/Dropdown/Dropdown";

function ManageUserRolesPage() {

  const navigate = useNavigate();

  useEffect(() => {

    document.title = "Manage user • Waltz";

  }, []);

  const { username } = useParams();
  const [user, setUser] = React.useState<User | null>(null);
  const [searchingForUser, setSearchingForUser] = useState(true);
  const [roles, setRoles] = useState<Role[] | null>(null);
  const [selectedRoleIDs, setSelectedRoleIDs] = useState<string[]>([]);
  const areAllRolesSelected = roles ? selectedRoleIDs.length === roles.length : false;

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
            Roles
          </Breadcrumb>
        </BreadcrumbList>
        <main>
          {
            searchingForUser ? <Spinner /> : (
              user ? (
                <>
                  <h1>Manage {user.displayName}'s roles</h1>
                  <section className="button-list">
                    <Dropdown name="Add role" isOpen={false} selectedItem="Add role" onClick={() => null}>

                    </Dropdown>
                    <button type="button" className="destructive-button" disabled={selectedRoleIDs.length === 0}>Remove selected roles</button>
                  </section>
                  {
                    roles ? (
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
                                  <input type="checkbox" checked={areAllRolesSelected} onClick={() => setSelectedRoleIDs(areAllRolesSelected ? [] : roles.map((role) => role.id))} />
                                </section>
                              </th>
                              <th scope="col">Role name</th>
                              <th scope="col">Role description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              roles.map((role) => (
                                <UserRoleTableBodyRow key={role.id} role={role} isSelected={selectedRoleIDs.includes(role.id)} onSelectionBoxClick={() => selectedRoleIDs.includes(user.id) ? setSelectedRoleIDs(selectedRoleIDs.filter((selectedRoleID) => selectedRoleID !== role.id)) : setSelectedRoleIDs([...selectedRoleIDs, user.id])} />
                              ))
                            }
                          </tbody>
                        </table>
                      </section>
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