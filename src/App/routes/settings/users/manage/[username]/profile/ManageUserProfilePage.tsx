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
import { avatarImageContainer as avatarImageContainerStyle, detailsContainer as detailsContainerStyle, userDataBox as userDataBoxStyle, username as usernameStyle } from "./ManageUserProfilePage.module.css";
import MenuListDisplayItem from "#components/MenuListDisplayItem/MenuListDisplayItem";
import MenuListDropdownItem from "#components/MenuListDropdownItem/MenuListDropdownItem";
import MenuListActionItem from "#components/MenuListActionItem/MenuListActionItem";
import NoAccountIcon from "#icons/NoAccountIcon";
import SignatureIcon from "#icons/SignatureIcon";
import PhotoCameraFrontIcon from "#icons/PhotoCameraFrontIcon";
import AtIcon from "#icons/AtIcon";
import UserSettingsIcon from "#icons/UserSettingsIcon";

function ManageUserProfilePage() {

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
          <Breadcrumb icon={<PersonIcon />} link={`/settings/users/manage/${username}/profile`}>
            Profile
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
                    <MenuListDropdownItem icon={<PhotoCameraFrontIcon />} label={"Profile photo"} description={`Manage ${user.displayName}'s profile photo.`}>
                      <MenuList>
                        <MenuListDisplayItem>
                          <Tip type="Warning">You can't do this yet.</Tip>
                        </MenuListDisplayItem>
                      </MenuList>
                    </MenuListDropdownItem>
                    <MenuListDropdownItem icon={<SignatureIcon />} label={"Display name"} description={`Manage ${user.displayName}'s display name.`}>
                      <MenuList>
                        <MenuListDisplayItem>
                          <p>This account's display name is currently <b>{user.displayName}</b>. It is used for display purposes and is not used to sign in. Unlike usernames, display names are not unique.</p>
                          <form>
                            <section>
                              <label htmlFor="display-name">Display name</label>
                              <input id="display-name" type="text" placeholder={user.displayName} onChange={e => null} />
                            </section>
                            <section>
                              <span>
                                <button type="submit" className="primary-button" disabled>Save</button>
                              </span>
                            </section>
                          </form>
                        </MenuListDisplayItem>
                      </MenuList>
                    </MenuListDropdownItem>
                    <MenuListDropdownItem icon={<AtIcon />} label={"Username"} description={`Manage ${user.displayName}'s username.`}>
                      <MenuList>
                        <MenuListDisplayItem>
                          <p>This account's username is currently <b>{user.username}</b>. It is used to sign in and distinguish this account from others. If you change this username, it will be immediately available for anyone to choose it.</p>
                          <form>
                            <section>
                              <label htmlFor="username">Username</label>
                              <input id="username" type="text" placeholder={user.username} onChange={e => null} />
                            </section>
                            <section>
                              <span>
                                <button type="submit" className="primary-button" disabled>Save</button>
                              </span>
                            </section>
                          </form>
                        </MenuListDisplayItem>
                      </MenuList>
                    </MenuListDropdownItem>
                    <MenuListDropdownItem icon={<NoAccountIcon />} label={"Delete account"} description={`Delete ${user.displayName}'s account and all associated data.`}>
                      <MenuList>
                        <MenuListActionItem>
                          <p>Delete this account and all associated data</p>
                          <button type="button" className="destructive-button">Delete</button>
                        </MenuListActionItem>
                        <MenuListActionItem>
                          <Tip>Looking to just disable this account? Consider removing the <code>waltz.sessions.create</code> permission instead of deleting the account.</Tip>
                        </MenuListActionItem>
                      </MenuList>
                    </MenuListDropdownItem>
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

export default React.memo(ManageUserProfilePage);