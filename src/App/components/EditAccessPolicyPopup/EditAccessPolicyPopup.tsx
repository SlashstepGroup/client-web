import React, { useCallback, useEffect, useMemo } from "react";
import PopupHeader from "../Popup/components/PopupHeader/PopupHeader";
import PopupContent from "../Popup/components/PopupContent/PopupContent";
import Popup from "../Popup/Popup";
import PopupFooter from "../Popup/components/PopupFooter/PopupFooter";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { AccessPolicy, AccessPolicyInheritanceLevel, AccessPolicyPermissionLevel, Action, Client, User } from "@waltzgroup/javascript-sdk";
import Tip from "#components/Tip/Tip";
import { actionCell as actionCellStyle, actionHeaderCell as actionHeaderCellStyle, inheritanceHeaderCell as inheritanceHeaderCellStyle, permissionLevelHeaderCell as permissionLevelHeaderCellStyle, pendingDeleteRow as pendingDeleteRowStyle } from "./EditAccessPolicyPopup.module.css";
import Dropdown from "#components/Dropdown/Dropdown";
import AccessPolicyTableRow from "#components/AccessPolicyTableRow/AccessPolicyTableRow";

function EditAccessPolicyPopup({shouldOpen, onClose}: { shouldOpen: boolean, onClose: () => void }) {

  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchingForAccessPolicy, setIsSearchingForAccessPolicy] = React.useState(true);
  const [accessPolicies, setAccessPolicies] = React.useState<AccessPolicy[]>([]);
  const [newAccessPolicies, setNewAccessPolicies] = React.useState<{ [accessPolicyID: string]: AccessPolicy | null }>({});
  const [isSavingAccessPolicies, setIsSavingAccessPolicies] = React.useState(false);
  const [selectedAccessPolicyIDs, setSelectedAccessPolicyIDs] = React.useState<string[]>([]);

  useEffect(() => {

    (async () => {

      // TODO: Get access policy from API
      setAccessPolicies([new AccessPolicy({
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
        }, {} as Client),
      }, {} as Client)]);

      setIsSearchingForAccessPolicy(false);

    })();

  }, []);

  const areAllAccessPoliciesSelected = selectedAccessPolicyIDs.length === accessPolicies.length;
  const areAllSelectedAccessPoliciesMarkedForDeletion = useMemo(() => {

    for (const selectedAccessPolicyID of selectedAccessPolicyIDs) {

      if (newAccessPolicies[selectedAccessPolicyID] !== null) {

        return false;

      }

    }

    return true;

  }, [selectedAccessPolicyIDs, newAccessPolicies]);

  const markSelectedAccessPoliciesForDeletion = useCallback(() => {

    const newAccessPoliciesWithNulls = { ...newAccessPolicies };

    for (const selectedAccessPolicyID of selectedAccessPolicyIDs) {

      newAccessPoliciesWithNulls[selectedAccessPolicyID] = null;

    };

    setNewAccessPolicies(newAccessPoliciesWithNulls);
    setSelectedAccessPolicyIDs([]);

  }, [newAccessPolicies, selectedAccessPolicyIDs]);

  const restoreSelectedAccessPolicies = useCallback(() => {

    const updatedNewAccessPolicies = { ...newAccessPolicies };

    for (const selectedAccessPolicyID of selectedAccessPolicyIDs) {

      delete updatedNewAccessPolicies[selectedAccessPolicyID];

    };

    setNewAccessPolicies(updatedNewAccessPolicies);
    setSelectedAccessPolicyIDs([]);

  }, [newAccessPolicies, selectedAccessPolicyIDs]);

  return (
    <Popup shouldOpen={shouldOpen} onClose={onClose}>
      <PopupHeader onClose={() => navigate(location.pathname)} canClose={!isSavingAccessPolicies}>
        Edit access policies for a principal
      </PopupHeader>
      <PopupContent>
        {
          isSearchingForAccessPolicy ? (
            <Spinner />
          ) : (
            accessPolicies[0] ? (
              <form>
                <section>
                  <label>Principal</label>
                  <section className="account">
                    <section>{accessPolicies[0].principal?.displayName}</section>
                    <section className="account-type">{accessPolicies[0].principal instanceof User ? "User" : "Group"}</section>
                  </section>
                </section>
                <section>
                  <label>Scope</label>
                  <section className="account">
                    <section>Beastslash</section>
                    <section className="account-type">Instance</section>
                  </section>
                </section>
                <section>
                  <label>Access policies</label>
                  <section className="button-list">
                    <Dropdown name="Add action" isOpen={false} selectedItem="Add action" onClick={() => null}>

                    </Dropdown>
                    {
                      selectedAccessPolicyIDs.length > 0 ? (
                        areAllSelectedAccessPoliciesMarkedForDeletion ? (
                          <button type="button" disabled={selectedAccessPolicyIDs.length === 0} onClick={restoreSelectedAccessPolicies}>Restore selected access policies</button>
                        ) : (
                          <button type="button" disabled={selectedAccessPolicyIDs.length === 0} onClick={markSelectedAccessPoliciesForDeletion}>Delete selected access policies</button>
                        )
                      ) : null
                    }
                  </section>
                  <section className="table-container">
                    <table>
                      <colgroup />
                      <colgroup />
                      <colgroup />
                      <colgroup />
                      <thead>
                        <tr>
                          <th scope="col" className="checkbox-cell">
                            <section>
                              <input type="checkbox" checked={areAllAccessPoliciesSelected} onClick={() => setSelectedAccessPolicyIDs(areAllAccessPoliciesSelected ? [] : accessPolicies.map((accessPolicy) => accessPolicy.id))} />
                            </section>
                          </th>
                          <th scope="col" id={actionHeaderCellStyle}>Action</th>
                          <th scope="col" id={permissionLevelHeaderCellStyle}>Permission level</th>
                          <th scope="col" id={inheritanceHeaderCellStyle}>Inheritance level</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          accessPolicies.map((accessPolicy) => (
                            <AccessPolicyTableRow accessPolicy={accessPolicy} isSelected={selectedAccessPolicyIDs.includes(accessPolicy.id)} onSelectionBoxClick={() => selectedAccessPolicyIDs.includes(accessPolicy.id) ? setSelectedAccessPolicyIDs(selectedAccessPolicyIDs.filter((selectedAccessPolicyID) => selectedAccessPolicyID !== accessPolicy.id)) : setSelectedAccessPolicyIDs([...selectedAccessPolicyIDs, accessPolicy.id])} isMarkedForDeletion={newAccessPolicies[accessPolicy.id] === null} newAccessPolicy={newAccessPolicies[accessPolicy.id]} onChange={(newAccessPolicy) => {
                              
                              const updatedNewAccessPolicies = {...newAccessPolicies};

                              if (newAccessPolicy.permissionLevel === accessPolicy.permissionLevel && newAccessPolicy.inheritanceLevel === accessPolicy.inheritanceLevel) {

                                delete updatedNewAccessPolicies[accessPolicy.id];

                              } else {

                                updatedNewAccessPolicies[accessPolicy.id] = newAccessPolicy;

                              }

                              setNewAccessPolicies(updatedNewAccessPolicies);

                            }}/>
                          ))
                        }
                      </tbody>
                    </table>
                  </section>
                </section>
              </form>
            ) : (
              <Tip>Couldn't find that principal.</Tip>
            )
          )
        }
          
      </PopupContent>
      {
        isSearchingForAccessPolicy ? null : (
          <PopupFooter>
            {
              accessPolicies[0] ? (
                <button type="submit" className="primary-button" disabled={isSavingAccessPolicies || Object.keys(newAccessPolicies).length === 0} onClick={() => setIsSavingAccessPolicies(true)}>
                  <span>Save</span>
                  {
                    isSavingAccessPolicies ? (
                      <Spinner />
                    ) : null
                  }
                </button>
              ) : null
            }
            <button type="button" disabled={isSavingAccessPolicies} onClick={() => navigate(location.pathname)}>Cancel</button>
          </PopupFooter>
        )
      }
    </Popup>
  );
}

export default React.memo(EditAccessPolicyPopup);