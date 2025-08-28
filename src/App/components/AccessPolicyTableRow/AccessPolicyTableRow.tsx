import { AccessPolicy, AccessPolicyPermissionLevel, AccessPolicyInheritanceLevel, Client } from "@waltzgroup/javascript-sdk";
import React, { useCallback } from "react";
import { actionCell as actionCellStyle, pendingDeleteRow as pendingDeleteRowStyle } from "./AccessPolicyTableRow.module.css";
import AccessPolicyInheritanceDropdown from "#components/AccessPolicyInheritanceDropdown/AccessPolicyInheritanceDropdown";
import AccessPolicyPermissionLevelDropdown from "#components/AccessPolicyPermissionLevelDropdown/AccessPolicyPermissionLevelDropdown";

function AccessPolicyTableRow({accessPolicy, isMarkedForDeletion, newAccessPolicy, onChange, onSelectionBoxClick, isSelected}: {accessPolicy: AccessPolicy, isMarkedForDeletion: boolean, newAccessPolicy?: AccessPolicy | null, isSelected: boolean, onSelectionBoxClick: () => void, onChange: (accessPolicy: AccessPolicy) => void}) {

  const previousPermissionLevel = accessPolicy.permissionLevel;
  const selectedPermissionLevel = newAccessPolicy?.permissionLevel ?? accessPolicy.permissionLevel;
  const previousInheritanceLevel = accessPolicy.inheritanceLevel;
  const selectedInheritanceLevel = newAccessPolicy?.inheritanceLevel ?? accessPolicy.inheritanceLevel;

  const handlePermissionLevelChange = useCallback((newPermissionLevel: AccessPolicyPermissionLevel) => {

    onChange(new AccessPolicy({ 
      ...(newAccessPolicy ?? accessPolicy),
      permissionLevel: newPermissionLevel
    }, {} as Client));

  }, [newAccessPolicy, accessPolicy]);

  const handleInheritanceLevelChange = useCallback((newInheritanceLevel: AccessPolicyInheritanceLevel) => {

    onChange(new AccessPolicy({ 
      ...(newAccessPolicy ?? accessPolicy),
      inheritanceLevel: newInheritanceLevel
    }, {} as Client));

  }, [newAccessPolicy, accessPolicy]);

  const didUserModifyPermissionLevel = newAccessPolicy && newAccessPolicy?.permissionLevel !== accessPolicy.permissionLevel;
  const didUserModifyInheritanceLevel = newAccessPolicy && newAccessPolicy?.inheritanceLevel !== accessPolicy.inheritanceLevel;

  return (
    <tr key={accessPolicy.id} className={isMarkedForDeletion ? pendingDeleteRowStyle : null}>
      <td className="checkbox-cell">
        <section>
          <input type="checkbox" checked={isSelected} onClick={onSelectionBoxClick} />
        </section>
      </td>
      <td className={actionCellStyle}>
        <section>
          <section>
            {
              isMarkedForDeletion ? <del>{accessPolicy.action?.displayName ?? accessPolicy.actionID}</del> : <span>{accessPolicy.action?.displayName ?? accessPolicy.actionID}</span>
            }
          </section>
          <p className="item-description">
            {accessPolicy.action?.name}
          </p>
        </section>
      </td>
      <td>
        <AccessPolicyPermissionLevelDropdown selectedPermissionLevel={selectedPermissionLevel} onChange={handlePermissionLevelChange} isDisabled={isMarkedForDeletion}/>
        {
          didUserModifyPermissionLevel ? (
            <p className="item-description">Previously set to <b>{previousPermissionLevel}</b></p>
          ) : null
        }
      </td>
      <td>
        <AccessPolicyInheritanceDropdown selectedInheritanceLevel={selectedInheritanceLevel} onChange={handleInheritanceLevelChange} isDisabled={isMarkedForDeletion}/>
        {
          didUserModifyInheritanceLevel ? (
            <p className="item-description">Previously set to <b>{previousInheritanceLevel}</b></p>
          ) : null
        }
      </td>
    </tr>
  )

}

export default React.memo(AccessPolicyTableRow);