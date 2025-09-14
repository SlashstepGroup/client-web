import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BreadcrumbList from "#components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "#components/Breadcrumb/Breadcrumb";
import SettingsIcon from "#icons/SettingsIcon";
import { Client, Role, User } from "@slashstepgroup/javascript-sdk";
import Spinner from "#components/Spinner/Spinner";
import PersonIcon from "#icons/PersonIcon";
import Tip from "#components/Tip/Tip";
import UserSettingsIcon from "#icons/UserSettingsIcon";
import RoleDropdown from "#components/RoleDropdown/RoleDropdown";
import UserRoleTableBodyRow from "#components/UserRoleTableBodyRow/UserRoleTableBodyRow";
import OpenDoorIcon from "#icons/OpenDoorIcon";
import MenuList from "#components/MenuList/MenuList";
import MenuListDropdownItem from "#components/MenuListDropdownItem/MenuListDropdownItem";
import MenuListDisplayItem from "#components/MenuListDisplayItem/MenuListDisplayItem";
import DesktopIcon from "#icons/DesktopIcon";
import PhoneIcon from "#icons/PhoneIcon";
import CloudIcon from "#icons/CloudIcon";

function ManageUserSessionsPage() {

  const { username, instanceID } = useParams();
  const [user, setUser] = React.useState<User | null>(null);
  const [searchingForUser, setSearchingForUser] = useState(true);
  const [shouldUpdateGroups, setShouldUpdateGroups] = useState(false);
  const [selectedRoleIDs, setSelectedRoleIDs] = useState<string[]>([]);
  const [sessions, setSessions] = useState<Record<string, any>[] | null>(null);
  const [sessionIDToDelete, setSessionIDToDelete] = useState<string | null>(null);

  useEffect(() => {

    document.title = `Manage ${user?.displayName ?? username}'s sessions • Slashstep`;

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
    setSessions([{
      id: "123",
    }]);

  }, []);

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
          <Breadcrumb icon={<OpenDoorIcon />} link={`/instances/${instanceID}/settings/users/manage/${username}/sessions`}>
            Sessions
          </Breadcrumb>
        </BreadcrumbList>
        <main>
          {
            searchingForUser ? <Spinner /> : (
              user ? (
                <>
                  {/* <Tip type="Error">
                    {user.displayName} already has that role.
                  </Tip> */}
                  <h1>Manage {user.displayName}'s sessions</h1>
                  <p>This is a list of all of {user.displayName}'s sessions. Delete any unrecognized sessions, or any sessions that {user.displayName} no longer needs.</p>
                  {
                    sessions ? (
                      sessions.length > 0 ? (
                        <section>
                          <section className="column-section">
                            <h2>Active sessions</h2>
                            <MenuList>
                              {
                                sessions.map((session) => (
                                  <MenuListDropdownItem icon={<DesktopIcon />} label={`Firefox on Windows`} description={`Last accessed in Clinton Township (24.192.223.152), right now`}>
                                    <MenuList>
                                      <MenuListDisplayItem>
                                        <section>
                                          <button type="button" className="destructive-button" disabled={!!sessionIDToDelete} onClick={() => setSessionIDToDelete(session.id)}>
                                            <span>Delete session</span>
                                            {sessionIDToDelete === session.id ? <Spinner /> : null}
                                          </button>
                                        </section>
                                      </MenuListDisplayItem>
                                    </MenuList>
                                  </MenuListDropdownItem>
                                ))
                              }
                            </MenuList>
                          </section>
                          <section className="column-section">
                            <h2>Other sessions</h2>
                            <MenuList>
                              {
                                sessions.map((session) => (
                                  <MenuListDropdownItem icon={<PhoneIcon />} label={`Firefox on Android`} description={`Last accessed in Clinton Township (24.192.223.152), 2 hours ago`}>
                                    <MenuList>
                                      <MenuListDisplayItem>
                                        <section>
                                          <button type="button" className="destructive-button" disabled={!!sessionIDToDelete} onClick={() => setSessionIDToDelete(session.id)}>
                                            <span>Delete session</span>
                                            {sessionIDToDelete === session.id ? <Spinner /> : null}
                                          </button>
                                        </section>
                                      </MenuListDisplayItem>
                                    </MenuList>
                                  </MenuListDropdownItem>
                                ))
                              }
                            </MenuList>
                          </section>
                        </section>
                      ) : (
                        <Tip>No sessions to display.</Tip>
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

export default React.memo(ManageUserSessionsPage);