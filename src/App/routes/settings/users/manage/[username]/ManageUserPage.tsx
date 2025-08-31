import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import SettingsIcon from "#icons/SettingsIcon";
import { Client, User } from "@waltzgroup/javascript-sdk";
import Spinner from "#components/Spinner/Spinner";
import PersonIcon from "#icons/PersonIcon";
import Tip from "#components/Tip/Tip";
import MenuList from "#components/MenuList/MenuList";
import MenuListLinkItem from "#components/MenuListLinkItem/MenuListLinkItem";
import { avatarImageContainer as avatarImageContainerStyle, detailsContainer as detailsContainerStyle, userDataBox as userDataBoxStyle, username as usernameStyle } from "./ManageUserPage.module.css";
import MenuListDisplayItem from "#components/MenuListDisplayItem/MenuListDisplayItem";
import KeyIcon from "#icons/KeyIcon";
import WorldIcon from "#icons/WorldIcon";
import OpenDoorIcon from "#icons/OpenDoorIcon";
import UserSettingsIcon from "#icons/UserSettingsIcon";

function CreateUserPage() {

  const navigate = useNavigate();

  useEffect(() => {

    document.title = "Manage user • Waltz";

  }, []);

  const { username } = useParams();
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
        </BreadcrumbList>
        <main>
          {
            searchingForUser ? <Spinner /> : (
              user ? (
                <>
                  <h1>Manage {user.displayName}</h1>
                  <MenuList>
                    <MenuListDisplayItem id={userDataBoxStyle}>
                      <section id={avatarImageContainerStyle}>

                      </section>
                      <section id={detailsContainerStyle}>
                        <b id={usernameStyle}>{user.displayName}</b>
                        <section>{user.username}</section>
                      </section>
                    </MenuListDisplayItem>
                    <MenuListLinkItem icon={<PersonIcon />} link={`/settings/users/manage/${username}/profile`} label={"Profile"} description={`Manage ${user.displayName}'s username, email, and other details.`} />
                    <MenuListLinkItem icon={<KeyIcon />} link={`/settings/users/manage/${username}/permissions`} label={"Permissions"} description={`Manage what ${user.displayName} can do on your instance.`} />
                    <MenuListLinkItem icon={<OpenDoorIcon />} link={`/settings/users/manage/${username}/sessions`} label={"Sessions"} description={`See where and when ${user.displayName} is active, and manage their active sessions.`} />
                    <MenuListLinkItem icon={<WorldIcon />} link={`/settings/users/manage/${username}/workspaces`} label={"Workspaces"} description={`Manage ${user.displayName}'s workspace memberships.`} />
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

export default React.memo(CreateUserPage);