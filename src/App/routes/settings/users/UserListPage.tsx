import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import KeyIcon from "#icons/KeyIcon";
import SettingsIcon from "#icons/SettingsIcon";
import { Client, User } from "@waltzgroup/javascript-sdk";
import Spinner from "#components/Spinner/Spinner";
import PrincipalTableBodyRow from "#components/UserTableBodyRow/UserTableBodyRow";
import { PopupConfig } from "../../../App";

function UserListPage({setPopupConfig}: {setPopupConfig: (popupConfig: PopupConfig) => void}) {

  const navigate = useNavigate();

  useEffect(() => {

    document.title = "Users • Waltz";

  }, []);

  const [users, setUsers] = React.useState<User[] | null>(null);
  const [selectedUserIDs, setSelectedUserIDs] = useState<string[]>([]);
  const [isDeletionPopupOpen, setIsDeletionPopupOpen] = useState(false);

  useEffect(() => {

    // TODO: Get users from API
    setUsers([
      new User({
        id: "user1",
        username: "christian.toney",
        displayName: "Christian Toney"
      }, {} as Client),
    ]);

  }, []);

  const areAllUsersSelected = users ? selectedUserIDs.length === users.length : false;

  return (
    <>
      <section id="main-container">
        
        <BreadcrumbList>
          <Breadcrumb icon={<SettingsIcon />} link="/settings">
            Settings
          </Breadcrumb>
          <Breadcrumb icon={<KeyIcon />} link="/settings/users">
            Users
          </Breadcrumb>
        </BreadcrumbList>
        <main>
          <h1>Users</h1>
          <p>Users can interact with workspaces, projects, and other resources in your instance. They all have a set of permissions and roles, and some other information so you can know who they are.</p>
          <section className="button-list">
            <button className="primary-button" onClick={() => navigate("/settings/users/create")}>Create user</button>
            <button onClick={() => setPopupConfig({
              action: "delete-users",
              users: users ? users.filter((user) => selectedUserIDs.includes(user.id)) : []
            })} disabled={selectedUserIDs.length === 0} className="destructive-button">Delete selected users</button>
          </section>
          {
            users ? (
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
                          <input type="checkbox" checked={areAllUsersSelected} onClick={() => setSelectedUserIDs(areAllUsersSelected ? [] : users.map((user) => user.id))} />
                        </section>
                      </th>
                      <th scope="col">Display name</th>
                      <th scope="col">Username</th>
                      <th scope="col">User ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users.map((user) => (
                        <PrincipalTableBodyRow key={user.id} user={user} isSelected={selectedUserIDs.includes(user.id)} onSelectionBoxClick={() => selectedUserIDs.includes(user.id) ? setSelectedUserIDs(selectedUserIDs.filter((selectedUserID) => selectedUserID !== user.id)) : setSelectedUserIDs([...selectedUserIDs, user.id])} />
                      ))
                    }
                  </tbody>
                </table>
              </section>
            ) : <Spinner />
          }
        </main>
      </section>
    </>
  );

}

export default React.memo(UserListPage);