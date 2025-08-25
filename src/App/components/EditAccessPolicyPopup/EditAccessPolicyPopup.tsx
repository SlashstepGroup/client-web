import React, { useCallback, useEffect, useMemo } from "react";
import PopupHeader from "../Popup/components/PopupHeader/PopupHeader";
import PopupContent from "../Popup/components/PopupContent/PopupContent";
import Popup from "../Popup/Popup";
import PopupFooter from "../Popup/components/PopupFooter/PopupFooter";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { AccessPolicy, AccessPolicyPermissionLevel, Client, User } from "@waltzgroup/javascript-sdk";
import Tip from "#components/Tip/Tip";
import DropdownArrowIcon from "#icons/DropdownArrowIcon";
import PermissionLevelDropdown from "#components/PermissionLevelDropdown/PermissionLevelDropdown";
import { actionCell as actionCellStyle, actionHeaderCell as actionHeaderCellStyle, inheritanceHeaderCell as inheritanceHeaderCellStyle, permissionLevelHeaderCell as permissionLevelHeaderCellStyle, pendingDeleteRow as pendingDeleteRowStyle } from "./EditAccessPolicyPopup.module.css";
import Dropdown from "#components/Dropdown/Dropdown";

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
        permissionLevel: 0,
        principal: new User({
          id: "user1",
          username: "user1",
          displayName: "User 1"
        }, {} as Client)
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
                    <section>{accessPolicies[0].principal.displayName}</section>
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
                    <Dropdown isOpen={false} selectedItem="Add action" onClick={() => null}>

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
                          <th scope="col" id={inheritanceHeaderCellStyle}>Inheritance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          accessPolicies.map((accessPolicy) => (
                            <tr key={accessPolicy.id} className={newAccessPolicies[accessPolicy.id] === null ? pendingDeleteRowStyle : null}>
                              <td className="checkbox-cell">
                                <section>
                                  <input type="checkbox" checked={selectedAccessPolicyIDs.includes(accessPolicy.id)} onClick={() => selectedAccessPolicyIDs.includes(accessPolicy.id) ? setSelectedAccessPolicyIDs(selectedAccessPolicyIDs.filter((selectedAccessPolicyID) => selectedAccessPolicyID !== accessPolicy.id)) : setSelectedAccessPolicyIDs([...selectedAccessPolicyIDs, accessPolicy.id])} />
                                </section>
                              </td>
                              <td className={actionCellStyle}>
                                <section>
                                  <section>
                                    <span>Edit access policies</span>
                                  </section>
                                  <p className="item-description">waltz.accessPolicies.edit</p>
                                </section>
                              </td>
                              <td>
                                <PermissionLevelDropdown selectedPermissionLevel={newAccessPolicies[accessPolicy.id]?.permissionLevel ?? accessPolicy.permissionLevel} onChange={(newPermissionLevel) => {

                                  setNewAccessPolicies((newAccessPolicies) => {

                                    newAccessPolicies = { ...newAccessPolicies };
                                    const oldAccessPolicy = newAccessPolicies[accessPolicy.id] ?? accessPolicy;
                                    const newAccessPolicy = new AccessPolicy({ 
                                      ...oldAccessPolicy,
                                      permissionLevel: newPermissionLevel
                                    }, {} as Client);

                                    if (newAccessPolicy.permissionLevel === accessPolicy.permissionLevel) {

                                      delete newAccessPolicies[accessPolicy.id];

                                    } else {

                                      newAccessPolicies[accessPolicy.id] = newAccessPolicy;

                                    }

                                    return newAccessPolicies;

                                  });

                                }} isDisabled={newAccessPolicies[accessPolicy.id] === null}/>
                                {
                                  newAccessPolicies[accessPolicy.id] && newAccessPolicies[accessPolicy.id]?.permissionLevel !== accessPolicy.permissionLevel ? (
                                    <p className="item-description">Preivously set to <b>{accessPolicy.permissionLevel === AccessPolicyPermissionLevel.None ? "None" : accessPolicy.permissionLevel === AccessPolicyPermissionLevel.User ? "User" : "Admin"}</b></p>
                                  ) : null
                                }
                              </td>
                              <td>
                                <button type="button" disabled={newAccessPolicies[accessPolicy.id] === null}>
                                  <span>Default</span>
                                  <DropdownArrowIcon />
                                </button>
                              </td>
                            </tr>
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