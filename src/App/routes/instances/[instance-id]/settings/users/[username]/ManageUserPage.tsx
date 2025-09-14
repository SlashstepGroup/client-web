import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import SettingsIcon from "#components/icons/SettingsIcon";
import { Client, User } from "@slashstepgroup/javascript-sdk";
import Spinner from "#components/Spinner/Spinner";
import PersonIcon from "#components/icons/PersonIcon";
import Tip from "#components/Tip/Tip";
import MenuList from "#components/MenuList/MenuList";
import MenuListLinkItem from "#components/menu-list-items/MenuListLinkItem/MenuListLinkItem";
import { avatarImageContainer as avatarImageContainerStyle, detailsContainer as detailsContainerStyle, userDataBox as userDataBoxStyle, username as usernameStyle } from "./ManageUserPage.module.css";
import MenuListDisplayItem from "#components/menu-list-items/MenuListDisplayItem/MenuListDisplayItem";
import WorldIcon from "#components/icons/WorldIcon";
import OpenDoorIcon from "#components/icons/OpenDoorIcon";
import UserSettingsIcon from "#components/icons/UserSettingsIcon";
import GroupIcon from "#components/icons/GroupIcon";
import CloudIcon from "#components/icons/CloudIcon";
import Skeleton from "#components/Skeleton/Skeleton";

function CreateUserPage() {

  const navigate = useNavigate();

  useEffect(() => {

    document.title = "Manage user • Slashstep";

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

  return (
    <>
      <section id="main-container">
        <BreadcrumbList>
          <Breadcrumb icon={<CloudIcon />} link={`/instances/${instanceID}`}>
            <Skeleton width={100} height={20} />
          </Breadcrumb>
          <Breadcrumb icon={<SettingsIcon />} link={`/instances/${instanceID}/settings`}>Settings</Breadcrumb>
          <Breadcrumb icon={<PersonIcon />} link={`/instances/${instanceID}/settings/users`}>Users</Breadcrumb>
          <Breadcrumb icon={<UserSettingsIcon />} link={`/instances/${instanceID}/settings/users/${username}`}>
            <span>Manage </span>
            {
              user ? (
                <span>{user.displayName ?? user.username}</span>
              ) : <Skeleton width={100} height={20} />
            }</Breadcrumb>
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
                    <MenuListLinkItem icon={<PersonIcon />} link={`/instances/${instanceID}/settings/users/${username}/profile`} label={"Profile"} description={`Manage ${user.displayName}'s username, email, and other details.`} />
                    <MenuListLinkItem icon={<GroupIcon />} link={`/instances/${instanceID}/settings/users/${username}/groups`} label={"Groups"} description={`Manage what ${user.displayName} can do on your instance.`} />
                    <MenuListLinkItem icon={<OpenDoorIcon />} link={`/instances/${instanceID}/settings/users/${username}/sessions`} label={"Sessions"} description={`See where and when ${user.displayName} is active, and manage their active sessions.`} />
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