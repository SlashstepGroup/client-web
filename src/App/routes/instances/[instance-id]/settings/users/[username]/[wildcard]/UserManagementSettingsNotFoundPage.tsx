import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import CloudIcon from "#icons/CloudIcon";
import PersonIcon from "#icons/PersonIcon";
import QuestionMarkIcon from "#icons/QuestionMarkIcon";
import SettingsIcon from "#icons/SettingsIcon";
import UserSettingsIcon from "#icons/UserSettingsIcon";
import { Client, User } from "@waltzgroup/javascript-sdk";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function UserManagementSettingsNotFoundPage() {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    document.title = "Not found • Slashstep";

  }, []);

  const { username, instanceID } = useParams();
  const [user, setUser] = React.useState<User | null>(null);
  const [searchingForUser, setSearchingForUser] = useState(true);
  const [selectedUserIDs, setSelectedUserIDs] = useState<string[]>([]);
  const [shouldAskForPasswordOnSignIn, setShouldAskForPasswordOnSignIn] = useState(true);

  useEffect(() => {

    // TODO: Get user from API
    setUser(new User({
      id: "123",
      username: "christian.toney",
      displayName: "Christian Toney"
    }, {} as Client));
    setSearchingForUser(false);

  }, []);
  
  // const didChange = (newInstanceName && newInstanceName !== instance?.displayName) || (newDescription && newDescription !== instance?.description);

  return (
    <section id="main-container">
      <BreadcrumbList>
        <Breadcrumb icon={<CloudIcon />} link={`/instances/${instanceID}`}>Beastslash</Breadcrumb>
        <Breadcrumb icon={<SettingsIcon />} link={`/instances/${instanceID}/settings`}>Settings</Breadcrumb>
        <Breadcrumb icon={<PersonIcon />} link={`/instances/${instanceID}/settings/users`}>Users</Breadcrumb>
        <Breadcrumb icon={<UserSettingsIcon />} link={`/instances/${instanceID}/settings/users/manage/${username}`}>Manage {user ? (user.displayName ?? user.username) : username}</Breadcrumb>
        <Breadcrumb icon={<QuestionMarkIcon />} link={location.pathname}>Not found</Breadcrumb>
      </BreadcrumbList>
      <main>
        <h1>Not found</h1>
        <p>We couldn't find what you were looking for.</p>
        <section className="button-list">
          <button className="primary-button" onClick={() => navigate("/")}>Go back home</button>
        </section>
      </main>
    </section>
  );

}

export default React.memo(UserManagementSettingsNotFoundPage);