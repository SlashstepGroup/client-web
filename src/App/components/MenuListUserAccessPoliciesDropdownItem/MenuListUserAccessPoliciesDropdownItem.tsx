import AccessPolicyTableRow from "#components/AccessPolicyTableRow/AccessPolicyTableRow";
import Dropdown from "#components/Dropdown/Dropdown";
import MenuList from "#components/MenuList/MenuList";
import MenuListDisplayItem from "#components/MenuListDisplayItem/MenuListDisplayItem";
import MenuListDropdownItem from "#components/MenuListDropdownItem/MenuListDropdownItem";
import PersonIcon from "#icons/PersonIcon";
import { AccessPolicy, AccessPolicyInheritanceLevel, AccessPolicyPermissionLevel, Action, Client, User } from "@waltzgroup/javascript-sdk";
import React, { useEffect } from "react";

function MenuListUserAccessPoliciesDropdownItem({user}: { user: User }) {

  const [accessPolicies, setAccessPolicies] = React.useState<AccessPolicy[] | null>(null);
  const [newAccessPolicies, setNewAccessPolicies] = React.useState<{ [accessPolicyID: string]: AccessPolicy | null }>({});
  const [isSavingAccessPolicies, setIsSavingAccessPolicies] = React.useState(false);
  const [selectedAccessPolicyIDs, setSelectedAccessPolicyIDs] = React.useState<string[]>([]);
  const [isAddActionDropdownOpen, setIsAddActionDropdownOpen] = React.useState(false);

  useEffect(() => {



  }, []);

  return (
    <MenuListDropdownItem icon={<PersonIcon />} label={"Access policies"} description={"Directly manage access policies for this user. These policies take priority over roles."}>
      <MenuList>
        <MenuListDisplayItem>
          <section className="button-list">
            <Dropdown name="Add action" isOpen={isAddActionDropdownOpen} selectedItem="Add action" onClick={() => setIsAddActionDropdownOpen(!isAddActionDropdownOpen)}>
              <input type="text" placeholder="Search for an action" />
            </Dropdown>
            <button type="button" className="destructive-button">Remove selected policies</button>
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
                      <input type="checkbox" />
                    </section>
                  </th>
                  <th scope="col">Action</th>
                  <th scope="col">Permission level</th>
                  <th scope="col">Inheritance level</th>
                </tr>
              </thead>
              <tbody>
                <AccessPolicyTableRow 
                  isSelected={selectedAccessPolicyIDs.includes("accessPolicy1")} 
                  isMarkedForDeletion={false} 
                  onSelectionBoxClick={() => null}
                  onChange={() => null}
                  accessPolicy={new AccessPolicy({
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
                      name: "waltz.accessPolicies.edit",
                      displayName: "Edit access policies",
                      description: "Allows the user to edit access policies on a resource."
                    }, {} as Client)
                  }, {} as Client)} 
                />
              </tbody>
            </table>
          </section>
        </MenuListDisplayItem>
      </MenuList>
    </MenuListDropdownItem>
  )
  
}

export default React.memo(MenuListUserAccessPoliciesDropdownItem);