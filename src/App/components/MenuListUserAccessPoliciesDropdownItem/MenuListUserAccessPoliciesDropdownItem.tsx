import AccessPolicyTableRow from "#components/AccessPolicyTableRow/AccessPolicyTableRow";
import Dropdown from "#components/Dropdown/Dropdown";
import MenuList from "#components/MenuList/MenuList";
import MenuListDisplayItem from "#components/MenuListDisplayItem/MenuListDisplayItem";
import MenuListDropdownItem from "#components/MenuListDropdownItem/MenuListDropdownItem";
import PersonIcon from "#icons/PersonIcon";
import { AccessPolicy, AccessPolicyInheritanceLevel, AccessPolicyPermissionLevel, Action, Client, User } from "@waltzgroup/javascript-sdk";
import React, { useEffect, useMemo } from "react";

function MenuListUserAccessPoliciesDropdownItem({user}: { user: User }) {

  const [accessPolicies, setAccessPolicies] = React.useState<AccessPolicy[]>([]);
  const [newAccessPolicies, setNewAccessPolicies] = React.useState<AccessPolicy[]>([]);
  const [isSavingAccessPolicies, setIsSavingAccessPolicies] = React.useState(false);
  const [selectedAccessPolicyIDs, setSelectedAccessPolicyIDs] = React.useState<string[]>([]);
  const [isAddActionDropdownOpen, setIsAddActionDropdownOpen] = React.useState(false);

  useEffect(() => {

    // TODO: Get access policies from API
    const accessPolicies = [
      new AccessPolicy({
        id: "accessPolicy1",
        principalID: "user1",
        principalType: "User",
        scopeID: "workspace1",
        scopeType: "Workspace",
        actionID: "action1",
        permissionLevel: AccessPolicyPermissionLevel.None,
        inheritanceLevel: AccessPolicyInheritanceLevel.Disabled,
        principal: new User({
          id: "user1",
          username: "user1",
          displayName: "User 1"
        }, {} as Client),
        action: new Action({
          id: "xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          name: "slashstep.accessPolicies.edit",
          displayName: "Edit access policies",
          description: "Allows the user to edit access policies on a resource."
        }, {} as Client)
      }, {} as Client)
    ];
    setAccessPolicies(accessPolicies);
    setNewAccessPolicies([...accessPolicies]);

  }, []);
  
  const mergedAccessPolicies = useMemo(() => {

    const mergedAccessPolicies: AccessPolicy[] = [...newAccessPolicies];

    for (const accessPolicy of accessPolicies) {

      if (!mergedAccessPolicies.find((mergedAccessPolicy) => mergedAccessPolicy.id === accessPolicy.id)) {

        mergedAccessPolicies.push(accessPolicy);

      }

    }

    return mergedAccessPolicies;

  }, [accessPolicies, newAccessPolicies]);

  return (
    <MenuListDropdownItem icon={<PersonIcon />} label={user.displayName} description={`${user.username} • ${accessPolicies.length} access polic${accessPolicies.length === 1 ? "y" : "ies"}`}>
      <MenuList>
        <MenuListDisplayItem>
          <section className="button-list">
            <Dropdown name="Add action" isOpen={isAddActionDropdownOpen} selectedItem="Add action" onClick={() => setIsAddActionDropdownOpen(!isAddActionDropdownOpen)}>
              <input type="text" placeholder="Search for an action" />
            </Dropdown>
            <button type="button" className="destructive-button" disabled={selectedAccessPolicyIDs.length === 0} onClick={() => {
              
              const filteredAccessPolicies = newAccessPolicies.filter((accessPolicy) => !selectedAccessPolicyIDs.includes(accessPolicy.id));
              setNewAccessPolicies(filteredAccessPolicies);
              setSelectedAccessPolicyIDs([]);

            }}>Delete selected access policies</button>
          </section>
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
                      <input 
                        type="checkbox" 
                        checked={selectedAccessPolicyIDs.length === mergedAccessPolicies.length}
                        onChange={() => setSelectedAccessPolicyIDs(selectedAccessPolicyIDs.length === mergedAccessPolicies.length ? [] : mergedAccessPolicies.map((accessPolicy) => accessPolicy.id))}
                      />
                    </section>
                  </th>
                  <th scope="col">Action</th>
                  <th scope="col">Permission level</th>
                  <th scope="col">Inheritance level</th>
                </tr>
              </thead>
              <tbody>
                {
                  mergedAccessPolicies.map((accessPolicy) => (
                    <AccessPolicyTableRow
                      key={accessPolicy.id}
                      isSelected={selectedAccessPolicyIDs.includes(accessPolicy.id)} 
                      isMarkedForDeletion={!newAccessPolicies.find((newAccessPolicy) => newAccessPolicy.id === accessPolicy.id)}
                      onSelectionBoxClick={() => setSelectedAccessPolicyIDs(selectedAccessPolicyIDs.includes(accessPolicy.id) ? selectedAccessPolicyIDs.filter((selectedAccessPolicyID) => selectedAccessPolicyID !== accessPolicy.id) : [...selectedAccessPolicyIDs, accessPolicy.id])}
                      onChange={() => null}
                      accessPolicy={accessPolicy} 
                    />
                  ))
                }
              </tbody>
            </table>
          </section>
        </MenuListDisplayItem>
      </MenuList>
    </MenuListDropdownItem>
  )
  
}

export default React.memo(MenuListUserAccessPoliciesDropdownItem);