import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import SettingsIcon from "#icons/SettingsIcon";
import { Client, User } from "@waltzgroup/javascript-sdk";
import Spinner from "#components/Spinner/Spinner";
import AddPersonIcon from "#icons/AddPersonIcon";
import PersonIcon from "#icons/PersonIcon";
import Tip from "#components/Tip/Tip";
import MenuList from "#components/MenuList/MenuList";
import MenuListLinkItem from "#components/MenuListLinkItem/MenuListLinkItem";
import { avatarImageContainer as avatarImageContainerStyle, detailsContainer as detailsContainerStyle, userDataBox as userDataBoxStyle, username as usernameStyle } from "./ManageUserPage.module.css";
import MenuListDisplayItem from "#components/MenuListDisplayItem/MenuListDisplayItem";

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
          <Breadcrumb icon={<AddPersonIcon />} link={`/settings/users/manage/${username}`}>
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
                    <MenuListLinkItem link={`/settings/users/manage/${username}/profile`} label={"Profile"} description={`Manage ${user.displayName}'s username, email, and other details.`} />
                    <MenuListLinkItem link={`/settings/users/manage/${username}/access-policies`} label={"Access policies"} description={`Choose what resources ${user.displayName} can access, and the extent of their access.`} />
                    <MenuListLinkItem link={`/settings/users/manage/${username}/sessions`} label={"Sessions"} description={`Manage ${user.displayName}'s active sessions.`} />
                    <MenuListLinkItem link={`/settings/users/manage/${username}/workspaces`} label={"Workspaces"} description={`Manage ${user.displayName}'s workspace memberships.`} />
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