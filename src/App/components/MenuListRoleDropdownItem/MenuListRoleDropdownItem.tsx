import MenuList from "#components/MenuList/MenuList";
import MenuListDisplayItem from "#components/MenuListDisplayItem/MenuListDisplayItem";
import MenuListDropdownItem from "#components/MenuListDropdownItem/MenuListDropdownItem";
import RoleDropdown from "#components/RoleDropdown/RoleDropdown";
import Spinner from "#components/Spinner/Spinner";
import UserRoleTableBodyRow from "#components/UserRoleTableBodyRow/UserRoleTableBodyRow";
import GroupIcon from "#icons/GroupIcon";
import { Client, Role, User } from "@waltzgroup/javascript-sdk";
import React, { useEffect, useState } from "react";

function MenuListRoleDropdownItem({user}: { user: User }) {

  const [roleToAdd, setRoleToAdd] = useState<Role | null>(null);
  const [shouldRemoveSelectedRoles, setShouldRemoveSelectedRoles] = useState(false);
  const [isAddRoleDropdownOpen, setIsAddRoleDropdownOpen] = useState(false);
  const [selectedRoleIDs, setSelectedRoleIDs] = useState<string[]>([]);
  const [roles, setRoles] = useState<Role[] | null>(null);
  const areAllRolesSelected = roles ? selectedRoleIDs.length === roles.length : false;

  useEffect(() => {

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
    <MenuListDropdownItem icon={<GroupIcon />} label={"Roles"} description={"Use roles to give pre-defined permissions to this user."}>
      <MenuList>
        <MenuListDisplayItem>
          {/* <Tip type="Error">
            {user.displayName} already has that role.
          </Tip> */}
          <section className="button-list">
            <RoleDropdown selectedItem={roleToAdd ? (
              <>
                {roleToAdd.name}
                <Spinner />
              </>
            ) : "Add role"} isOpen={isAddRoleDropdownOpen} onClick={() => setIsAddRoleDropdownOpen(!isAddRoleDropdownOpen)} onChange={(role) => {
              
              setRoleToAdd(role);
              setIsAddRoleDropdownOpen(false);
            
            }} isDisabled={roleToAdd !== null || shouldRemoveSelectedRoles} />
            <button type="button" className="destructive-button" disabled={selectedRoleIDs.length === 0 || shouldRemoveSelectedRoles || roleToAdd !== null} onClick={() => setShouldRemoveSelectedRoles(true)}>
              <span>Remove selected roles</span>
              {shouldRemoveSelectedRoles ? <Spinner /> : null}
            </button>
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
                          <input type="checkbox" checked={areAllRolesSelected} onClick={() => setSelectedRoleIDs(areAllRolesSelected ? [] : roles.map((role) => role.id))} disabled={shouldRemoveSelectedRoles || roleToAdd !== null} />
                        </section>
                      </th>
                      <th scope="col">Role name</th>
                      <th scope="col">Role description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      roles.map((role) => (
                        <UserRoleTableBodyRow key={role.id} role={role} isSelected={selectedRoleIDs.includes(role.id)} onSelectionBoxClick={() => selectedRoleIDs.includes(user.id) ? setSelectedRoleIDs(selectedRoleIDs.filter((selectedRoleID) => selectedRoleID !== role.id)) : setSelectedRoleIDs([...selectedRoleIDs, user.id])} isSelectionDisabled={shouldRemoveSelectedRoles || roleToAdd !== null} />
                      ))
                    }
                  </tbody>
                </table>
              </section>
            ) : (
              <Spinner />
            )
          }
        </MenuListDisplayItem>
      </MenuList>
    </MenuListDropdownItem>
  )
  
}

export default React.memo(MenuListRoleDropdownItem);