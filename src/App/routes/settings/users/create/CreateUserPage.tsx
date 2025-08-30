import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import SettingsIcon from "#icons/SettingsIcon";
import { Client, User } from "@waltzgroup/javascript-sdk";
import Spinner from "#components/Spinner/Spinner";
import PrincipalTableBodyRow from "#components/UserTableBodyRow/UserTableBodyRow";
import AddPersonIcon from "#icons/AddPersonIcon";
import PersonIcon from "#icons/PersonIcon";

function CreateUserPage() {

  const navigate = useNavigate();

  useEffect(() => {

    document.title = "Create user • Waltz";

  }, []);

  const [users, setUsers] = React.useState<User[] | null>(null);
  const [selectedUserIDs, setSelectedUserIDs] = useState<string[]>([]);
  const [shouldAskForPasswordOnSignIn, setShouldAskForPasswordOnSignIn] = useState(true);

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
          <Breadcrumb icon={<PersonIcon />} link="/settings/users">
            Users
          </Breadcrumb>
          <Breadcrumb icon={<AddPersonIcon />} link="/settings/users">
            Create user
          </Breadcrumb>
        </BreadcrumbList>
        <main>
          <h1>Create user</h1>
          <p>You can directly create a user account without going through the normal registration process.</p>
          <form>
            <section>
              <label htmlFor="username">Username</label>
              <input name="username" type="text" required />
            </section>
            <section>
              <label htmlFor="display-name">Display name</label>
              <input name="display-name" type="text" required />
            </section>
            <section>
              <label htmlFor="password">Password</label>
              <input name="password" type="password" required />
            </section>
            <section>
              <label htmlFor="confirm-password">Confirm password</label>
              <input name="confirm-password" type="password" required />
            </section>
            <section>
              <section>
                <input name="create-database-user" type="checkbox" checked={shouldAskForPasswordOnSignIn} />
                <label htmlFor="create-database-user">Require password change on first sign in</label>
              </section>
            </section>
            <section className="button-list">
              <button className="primary-button" type="submit" disabled>
                <span>Create user</span>
                <Spinner />
              </button>
              <button type="button" onClick={() => navigate("/settings/users")}>Cancel</button>
            </section>
          </form>
        </main>
      </section>
    </>
  );

}

export default React.memo(CreateUserPage);